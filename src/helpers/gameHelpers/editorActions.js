import { MOUSE_DOWN, MOUSE_UP, MOUSE_CLICK, MOUSE_MOVE, MOUSE_DRAG } from './handleClicks';
import { deepEquals, drillFor, listEquals } from '../chomping';
import {
  addPositions, subtractPositions, normalizePosition, comparePositions
} from './position';
import { openGameObjectProperties } from '../../actions';

export const editorEventHandler = (game, event, end, start) => {
  if (!game.editMode) return;
  switch (event) {
    case MOUSE_UP:
      editorMouseDragFinish(game, start, end);
      return editorMouseUp(game, end);
    case MOUSE_DOWN:
      return editorMouseDown(game, end);
    case MOUSE_CLICK:
      if (end.keys.altKey) return editorAltClick(game, end);
      if (end.keys.shiftKey) return editorShiftClick(game, end);
      if (end.keys.ctrlKey) return editorCtrlClick(game, end);
      return editorMouseClick(game, end);
    case MOUSE_MOVE:
      return editorMouseMove(game, end);
    case MOUSE_DRAG:
      return editorMouseDrag(game, start, end);
  }
};

const editorMouseUp = (game, end) => {
  game.games.forEach(game => setIsDragged(game, game.allPost(), false));
};

const editorMouseDown = (game, { targets }) => {
  setIsDragged(game, targets, true);
};

const filterDefault = position => pre => {
  return comparePositions(pre.position, position);
};

const filterDrag = position => pre => {
  return comparePositions(pre.position, position) && pre.type !== 'auto-wall';
};

const collectOthers = (game, type, position, filter = filterDefault) => {
  if (type !== 'auto-wall') {
    return [];
  }
  return game.allPreOther().filter(filter(position));
};

const editorMouseClick = (game, end) => {
  let tool = game.tool || {};
  let add = drillFor(EDITOR_ACTIONS, tool.tool + '.add', Function);
  let del = drillFor(EDITOR_ACTIONS, tool.tool + '.del', Function);
  let object = end.targets.find(item => item.custom.type === tool.tool);
  let others = collectOthers(game, tool.tool, end.block);
  if (object) {
    del(game, object);
  } else if (others.concat(end.targets).length === 0) {
    add(game, end.block, tool.sprite, tool.frames);
  }
  game.games.forEach(game => game.recalculateBounds());
};

const editorAltClick = editorMouseClick;

const editorCtrlClick = editorMouseClick;

const editorShiftClick = (game, end) => {
  let targets = end.targets.filter(item => item.custom.type === 'object');
  game.dispatch(openGameObjectProperties(targets));
};

const editorMouseMove = (game, end) => {
  game.destroyGhosts();
  let tool = game.tool || {};
  let others = collectOthers(game, tool.tool, end.block);
  if (others.concat(end.targets).length === 0) {
    let { x, y } = end.block;
    let sprite = tool.sprite;
    let frames = tool.frames || null;
    game.drawGhosts([{ x, y , sprite, frames }]);
  }
};

const eachDrag = (game, tool, difference) => drag => {
  let position = addPositions(drag.custom.position, difference);
  let others = collectOthers(game, drag.custom.type, position, filterDrag);
  if (others.length === 0) {
    drag.x = position.x;
    drag.y = position.y;
    if (drag.custom.type === 'auto-wall') game.updateAllWallSprites();
  }
};

const editorMouseDrag = (game, start, end) => {
  if (end.targets.length === 0 || listEquals(start.targets, end.targets)) {
    let difference = subtractPositions(end.block, start.block);
    let tool = game.tool || {};
    let drags = game.allPost().filter(object => object.custom.isDragged);
    drags.forEach(eachDrag(game, tool, difference));
  }
};

const editorMouseDragFinish = (game, start, end) => {
  let dragged = game.allPost().filter(object => object.custom.isDragged);
  dragged.forEach(drag => {
    let { type, position } = drag.custom;
    let others = collectOthers(game, type, position);
    let pre = game.allPre().filter(pre => deepEquals(pre, drag.custom));
    position = normalizePosition(drag);
    drag.custom.position = position;
    others.concat(pre).forEach(object => object.position = position);
  });
  game.redraw();
};

const addObject = (game, position, sprite = 'star', frames = null) => {
  let level = (game.playerNumber === 1) ? game.gameData.player1 : game.gameData.player2;
  let object = { sprite, type: 'object', position, frames };
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
