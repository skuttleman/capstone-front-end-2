import { MOUSE_DOWN, MOUSE_UP, MOUSE_CLICK, MOUSE_MOVE, MOUSE_DRAG } from './handleClicks';
import { deepEquals, drillFor } from '../chomping';
import {
  addPositions, subtractPositions, normalizePosition, comparePositions
} from './position';

export const editorEventHandler = (game, event, end, start) => {
  switch (event) {
    case MOUSE_UP:
      editorMouseDragFinish(game, start, end);
      return editorMouseUp(game, end);
    case MOUSE_DOWN:
      return editorMouseDown(game, end);
    case MOUSE_CLICK:
      return editorMouseClick(game, end);
    case MOUSE_MOVE:
      return editorMouseMove(game, end);
    case MOUSE_DRAG:
      return editorMouseDrag(game, start, end);
  }
};

const editorMouseUp = (game, end) => {
  setIsDragged(game, game.allPost(), false);
};

const editorMouseDown = (game, { targets }) => {
  setIsDragged(game, targets, true);
};

const editorMouseClick = (game, end) => {
  let tool = game.tool || 'auto-wall';
  let [add, del] = ['.add', '.del'].map(ext => drillFor(EDITOR_ACTIONS, tool + ext, Function));
  let object = end.targets.find(item => item.custom.type === tool);
  let others = (tool !== 'auto-wall') ? [] :
    game.allPreOther().filter(pre => comparePositions(pre.position, end.block));
  if (object) {
    del(game, object);
  } else if (others.concat(end.targets).length === 0) {
    add(game, end.block);
  }
};

const editorMouseMove = (game, end) => {
  game.destroyGhosts();
  let tool = game.tool || 'auto-wall';
  let others = (tool !== 'auto-wall') ? [] :
    game.allPreOther().filter(pre => comparePositions(pre.position, end.block));
  if (others.concat(end.targets).length === 0) {
    let { x, y } = end.block;
    let sprite = determineSprite(game.tool || 'auto-wall');
    let frames = [15];
    game.drawGhosts([{ x, y , sprite, frames }]);
  }
};

const eachDrag = (game, tool, difference) => drag => {
  let position = addPositions(drag.custom.position, difference);
  let others = (tool !== 'auto-wall') ? [] :
    game.allPreOther().filter(pre => comparePositions(pre.position, position));
  if (others.length === 0) {
    drag.x = position.x;
    drag.y = position.y;
    if (drag.custom.type === 'auto-wall') game.updateAllWallSprites();
  }
}

const editorMouseDrag = (game, start, end) => {
  if (end.targets.length === 0) {
    let difference = subtractPositions(end.block, start.block);
    let tool = game.tool || 'auto-wall';
    let drags = game.allPost().filter(object => object.custom.isDragged);
    drags.forEach(eachDrag(game, tool, difference));
  }
};

const otherFilter = drag => other => {
  return drag.custom.type === 'auto-wall' &&
    other.type === 'auto-wall' &&
    comparePositions(other.position, drag.custom.position);
};

const editorMouseDragFinish = (game, start, end) => {
  let dragged = game.allPost().filter(object => object.custom.isDragged);
  dragged.forEach(drag => {
    let others = game.allPreOther().filter(otherFilter(drag));
    let pre = game.allPre().filter(pre => deepEquals(pre, drag.custom));
    let position = normalizePosition(drag);
    drag.custom.position = position;
    others.concat(pre).forEach(object => object.position = position);
  });
  game.redraw();
};

const addObject = (game, position, sprite) => {
  sprite = sprite || 'star';
  let level = (game.playerNumber === 1) ? game.gameData.player1 : game.gameData.player2;
  let object = { sprite, type: 'object', position };
  level.push(object);
  game.levelData.objects.push(object);
  game.drawObjects();
};

const updateObject = (game, object, cb) => {
  let level = (game.playerNumber === 1) ? game.gameData.player1 : game.gameData.player2;
  [level, game.levelData.objects].forEach(array => {
    let i = array.findIndex(item => deepEquals(item, object.custom));
    if (i >= 0) array[i] = cb(object);
  });
  game.drawObjects();
};

const destroyObject = (game, object) => {
  let level = (game.playerNumber === 1) ? game.gameData.player1 : game.gameData.player2;
  [level, game.levelData.objects].forEach(array => {
    let i = array.findIndex(item => deepEquals(item, object.custom));
    if (i >= 0) array.splice(i, 1);
  });
  game.drawObjects();
};

const addWall = (game, position) => {
  let wall = { sprite: 'walls', type: 'auto-wall', position };
  game.gameData.common.push(wall);
  game.levelData.walls.push(wall);
  game.drawAllWalls(game.levelData.walls);
};

const destroyWall = (game, wall) => {
  [game.gameData.common, game.levelData.walls].forEach(array => {
    let i = array.findIndex(item => deepEquals(item, wall.custom));
    console.log(i);
    if (i >= 0) array.splice(i, 1);
  });
  game.drawAllWalls(game.levelData.walls);
};

const movePlayer = (game, position) => {
  let level = (game.playerNumber === 1) ? game.gameData.player1 : game.gameData.player2;
  let i = level.findIndex(item => item.type === 'player');
  if (i >= 0) level[i].position = position;
  game.levelData.player.position = position;
  game.drawPlayer();
};

const setIsDragged = (game, targets, value) => {
  targets.forEach(target => {
    let object = game.allPre().find(pre => deepEquals(pre, target.custom));
    target.custom.isDragged = !!value;
    if (object) object.isDragged = !!value;
  });
};

const determineSprite = tool => {
  switch (tool) {
    case 'auto-wall':
      return 'walls';
    default:
      return 'star';
  }
};

const EDITOR_ACTIONS = {
  'auto-wall': {
    add: addWall,
    del: destroyWall
  },
  player: {
    add: movePlayer
  },
  object: {
    add: addObject,
    del: destroyObject
  }
};
