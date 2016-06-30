import { comparePositions } from './position';

const isWallAt = (walls, { x, y }) => {
  return !!walls.find(wall => comparePositions(wall.position, { x, y }));
};
const isWallAbove = (walls, { x, y }) => isWallAt(walls, { x, y: y - 50 });
const isWallBelow = (walls, { x, y }) => isWallAt(walls, { x, y: y + 50 });
const isWallLeft = (walls, { x, y }) => isWallAt(walls, { x: x - 50, y });
const isWallRight = (walls, { x, y }) => isWallAt(walls, { x: x + 50, y });

const calculateFrame = (wall, walls) => {
  return isWallAbove(walls, wall.position) * 1 +
    isWallBelow(walls, wall.position) * 2 +
    isWallLeft(walls, wall.position) * 4 +
    isWallRight(walls, wall.position) * 8;
};

export default (game, walls, key) => {
  return walls.map(wall => {
    let newWall = game.add.sprite(wall.position.x, wall.position.y, wall.sprite);
    newWall.animations.add(key, [calculateFrame(wall, walls)]);
    newWall.animations.play(key);
    newWall.custom = {...wall};
    return newWall;
  });
};

const toPosition = ({ x, y }) => ({ position: { x, y }});

export const updateFrames = (game, walls, key) => {
  let positions = walls.map(toPosition);
  walls.forEach(wall => {
    let animation = wall.animations.getAnimation(key);
    if (animation) {
      animation._frames[0] = calculateFrame(toPosition(wall), positions);
      wall.animations.play(key);
    }
  });
};
