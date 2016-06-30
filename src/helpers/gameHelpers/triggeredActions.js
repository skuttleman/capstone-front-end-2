import { drillFor } from '../chomping';
import { getObjectsAtPosition } from './position';

const triggeredActions = {
  endGame(game) {
    game.endGame();
  },
  destroySelf(game, trigger, other) {
    game.destroyObject(trigger);
  },
  destroyOther(game, trigger, other) {
    game.destroyObject(other);
  }
};

export const triggerOnEnter = (game, object) => {
  let triggers = getObjectsAtPosition(game, object, object);
  triggers.forEach(trigger => {
    if (object === game.player) {
      onPlayerEnter(game, trigger, object);
    } else {
      onObjectEnter(game, trigger, object);
    }
  });
};

export const triggerOnExit = (game, object) => {
  let triggers = getObjectsAtPosition(game, object, object);
  triggers.forEach(trigger => {
    if (object === game.player) {
      onPlayerExit(game, trigger, object);
    } else {
      onObjectExit(game, trigger, object);
    }
  });
};

const onPlayerEnter = (game, trigger, player) => {
  let actions = drillFor(trigger, 'custom.behavior.onPlayerEnter.actions', Array);
  actions.forEach(({ action, args }) => {
    drillFor(triggeredActions, action, Function)(game, trigger, player, args);
  });
};

const onPlayerExit = (game, trigger, player) => {
  let actions = drillFor(trigger, 'custom.behavior.onPlayerExit.actions', Array);
  actions.forEach(({ action, args }) => {
    drillFor(triggeredActions, action, Function)(game, trigger, player, args);
  });
};

const onObjectEnter = (game, trigger, object) => {
  let actions = drillFor(trigger, 'custom.behavior.onObjectEnter.actions', Array);
  actions.forEach(({ action, args }) => {
    drillFor(triggeredActions, action, Function)(game, trigger, object, args);
  });
};

const onObjectExit = (game, trigger, object) => {
  let actions = drillFor(trigger, 'custom.behavior.onObjectExit.actions', Array);
  actions.forEach(({ action, args }) => {
    drillFor(triggeredActions, action, Function)(game, trigger, object, args);
  });
};
