import { triggerOnEnter, triggerOnExit } from './triggeredActions';
import {
  addPositions, comparePositions, getObjectsAtPosition, incrementPosition, moveTowards
} from './position';

const ANIMATION_SPEED = 7;
const MOVE_AMOUNT = 2;

const movePlayer = (moving => game => {
  if (moving) return;

  let amount = cursorKeyCheck(game);
  if (!moving && !comparePositions(amount, { x: 0, y: 0 })) {
    moving = true;
    movePlayerIfPossible(game, amount).then(() => {
      moving = false;
    });
  }
})(false);

export default movePlayer;

const cursorKeyCheck = game => {
  let { left, right, up, down } = game.cursorKeys;
  let amount = [
    { direction:  left, amount: { x: -50, y:   0 } },
    { direction: right, amount: { x:  50, y:   0 } },
    { direction:    up, amount: { x:   0, y: -50 } },
    { direction:  down, amount: { x:   0, y:  50 } },
  ].find(({ direction, amount }) => direction.isDown);
  return amount ? amount.amount : { x: 0, y: 0 };
};

const movePlayerIfPossible = (game, amount) => {
  return new Promise((resolve, reject) => {
    if (canItMoveOrEnter(game, game.player, null, amount)) {
      moveOrEnterObject(game, game.player, amount).then(resolve, reject);
    } else {
      resolve();
    }
  });
};

const canItMoveOrEnter = (game, object, requestor, amount) => {
  if (isType(object, 'auto-wall') ||
    !(isMovable(game, object, requestor) || isEnterable(game, object, requestor))
  ) {
    return false;
  }
  let position = addPositions(object, amount);
  let objectsAtPosition = getObjectsAtPosition(game, position);
  return objectsAtPosition.reduce((all, objectAtPosition) => {
    return all && canItMoveOrEnter(game, objectAtPosition, object, amount);
  }, true);
};

const isType = (object, type) => object.custom.type === type;

const isMovable = (game, object, requestor) => {
  if (object === game.player) {
    return true;
  } else if (requestor === game.player) {
    return !!object.custom.behavior && !!object.custom.behavior.playerMovable;
  } else {
    return !!object.custom.behavior && !!object.custom.behavior.objectMovable;
  }
};

const isEnterable = (game, object, requestor) => {
  if (object === game.player) {
    return false;
  } else if (requestor === game.player) {
    return !!object.custom.behavior && !!object.custom.behavior.playerEnterable;
  } else {
    return !!object.custom.behavior && !!object.custom.behavior.objectEnterable;
  }
};

const moveOrEnterObject = (game, object, amount, now) => {
  let position = addPositions(object, amount);
  let objectsAtPosition = getObjectsAtPosition(game, position);
  objectsAtPosition.forEach(objectAtPosition => {
    if (isMovable(game, objectAtPosition, object)) {
      moveOrEnterObject(game, objectAtPosition, amount, true);
    }
  });
  let target = addPositions(object, amount);
  let mover = createMover(game, object, target);
  return now ? Promise.resolve() : mover;
};

const createMover = (game, object, target) => {
  return new Promise(resolve => {
    const mover = () => {
      let newPosition = incrementPosition(object, target, MOVE_AMOUNT);
      if (comparePositions(newPosition, object)) {
        //game.dispatch({ UPDATE_LEVEL_DATA })
        triggerOnEnter(game, object);
        resolve();
      } else {
        ['x', 'y'].forEach(axis => object[axis] = newPosition[axis]);
        setTimeout(mover, ANIMATION_SPEED);
      }
    };
    triggerOnExit(game, object);
    mover();
  });
};
