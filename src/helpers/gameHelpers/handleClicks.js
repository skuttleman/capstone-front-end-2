import {
  getObjectsAtPosition, comparePositions, normalizePosition
} from './position';
import { editorEventHandler } from './editorActions';

export const MOUSE_DOWN = 'MOUSE_DOWN';
export const MOUSE_UP = 'MOUSE_UP';
export const MOUSE_CLICK = 'MOUSE_CLICK';
export const MOUSE_MOVE = 'MOUSE_MOVE';
export const MOUSE_DRAG = 'MOUSE_DRAG';

export const messageClicks = game => {
  // mouseEvents(game, messageEventHandler);
};

export const editorClicks = game => {
  mouseEvents(game, editorEventHandler);
};

const mouseEvents = (game, fireEvent) => {
  let arg = {};
  game.game.input.onDown.add(onDown.bind(null, game, arg, fireEvent));
  game.game.input.onUp.add(onUp.bind(null, game, arg, fireEvent));
  game.game.input.addMoveCallback(onMove.bind(null, game, arg, fireEvent));
  game.game.input.onTap.add(onTap.bind(null, game, arg, fireEvent));
  let canvas = document.getElementById(`${game.name}-${game.playerNumber || 1}`);
  canvas.addEventListener('mouseout', () => game.destroyGhosts());
};

const onDown = (game, arg, fireEvent, { worldX: x, worldY: y }) => {
  let normal = normalizePosition({ x, y });
  let block = normalizePosition({ x, y }, 50);
  if (!arg.downAt) {
    arg.downAt = normal;
    let targets = getObjectsAtPosition(game, block);
    fireEvent(game, MOUSE_DOWN, { position: normal, block, targets });
  }
};

const onUp = (game, arg, fireEvent, { worldX: x, worldY: y }) => {
  let normal = normalizePosition({ x, y });
  let block = normalizePosition({ x, y }, 50);
  if (arg.downAt) {
    let targets = getObjectsAtPosition(game, block);
    delete arg.downAt;
    fireEvent(game, MOUSE_UP, { position: normal, block, targets });
  }
};

const onTap = (game, arg, fireEvent, { worldX: x, worldY: y }) => {
  let normal = normalizePosition({ x, y });
  let block = normalizePosition({ x, y }, 50);
  let targets = getObjectsAtPosition(game, block);
  fireEvent(game, MOUSE_CLICK, { position: normal, block, targets });
};

const onMove = (game, arg, fireEvent, { worldX: x, worldY: y, isDown }) => {
  let normal = normalizePosition({ x, y });
  if(!comparePositions(arg.downAt, normal)) {
    let [block1, block2] = [normal, arg.downAt].map(coord => normalizePosition(coord, 50));
    let [targets1, targets2] = [block1, block2].map(coord => getObjectsAtPosition(game, coord));
    let end = { position: normal, block: block1, targets: targets1 };
    let start = { position: arg.downAt, block: block2, targets: targets2 };
    if (isDown && arg.downAt) {
      fireEvent(game, MOUSE_DRAG, end, start);
    } else if (!arg.downAt) {
      fireEvent(game, MOUSE_MOVE, end);
    }
  }
};
