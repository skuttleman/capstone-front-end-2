export const addPositions = (position1, position2) => {
  return {
    x: position1.x + position2.x,
    y: position1.y + position2.y
  };
};

export const subtractPositions = (position1, position2) => {
  return {
    x: position1.x - position2.x,
    y: position1.y - position2.y
  };
};

export const comparePositions = (position1 = {}, position2 = {}) => {
  return position1.x === position2.x && position1.y === position2.y;
};

export const validatePosition = (position = {}) => {
  let { x, y } = position;
  return !!position && Number(x) === x && Number(y) === y;
};

export const normalizePosition = (position = {}, block = 1) => {
  let { x, y } = position;
  return {
    x: (Number(x) || 0) - (Number(x) || 0) % block,
    y: (Number(y) || 0) - (Number(y) || 0) % block
  };
};

export const moveTowards = (current, target, amount) => {
  if (current + amount >= target && current - amount <= target) {
    return target;
  } else if (current < target) {
    return current + amount;
  } else {
    return current - amount;
  }
};

export const incrementPosition = (current, target, MOVE_AMOUNT) => {
  let x = moveTowards(current.x, target.x, MOVE_AMOUNT);
  let y = moveTowards(current.y, target.y, MOVE_AMOUNT);
  return { x, y };
};

export const getObjectsAtPosition = (game, position, exclude) => {
  let all = game.walls.concat(game.objects).concat(game.player);
  return all.filter(object => comparePositions(object, position) && object !== exclude);
};

export const toPosition = ({ x, y }) => ({ position: { x, y }});
