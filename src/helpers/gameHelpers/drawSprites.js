import { comparePositions, toPosition } from './position';

const isSpriteAt = (sprites, { x, y }) => {
  return !!sprites.find(sprite => comparePositions(sprite.position, { x, y }));
};
const isSpriteAbove = (sprites, { x, y }) => isSpriteAt(sprites, { x, y: y - 50 });
const isSpriteBelow = (sprites, { x, y }) => isSpriteAt(sprites, { x, y: y + 50 });
const isSpriteLeft = (sprites, { x, y }) => isSpriteAt(sprites, { x: x - 50, y });
const isSpriteRight = (sprites, { x, y }) => isSpriteAt(sprites, { x: x + 50, y });

const calculateFrame = (sprite, sprites) => {
  return isSpriteAbove(sprites, sprite.position) * 1 +
    isSpriteBelow(sprites, sprite.position) * 2 +
    isSpriteLeft(sprites, sprite.position) * 4 +
    isSpriteRight(sprites, sprite.position) * 8;
};

export default (game, sprites, assets, key = 'default') => {
  return sprites.map(sprite => {
    let asset = assets.find(asset => asset.args[0] === sprite.sprite) || {};
    let defaultFrames = asset.defaultFrames || [0];
    let calculated = asset.defaultFrames ? calculateFrame(sprite, sprites) : 0;
    let newSprite = game.add.sprite(sprite.position.x, sprite.position.y, sprite.sprite);
    newSprite.animations.add(key, defaultFrames.map(frame => frame + calculated), 10, true);
    newSprite.animations.play(key);
    newSprite.custom = {...sprite};
    return newSprite;
  });
};

export const updateFrames = (game, sprites, key = 'default') => {
  let positions = sprites.map(toPosition);
  sprites.forEach(sprite => {
    let animation = sprite.animations.getAnimation(key);
    if (animation) {
      animation._frames[0] = calculateFrame(toPosition(sprite), positions);
      sprite.animations.play(key);
    }
  });
};

export const drawGhosts = (game, ghosts) => {
  return ghosts.map(({ x, y, sprite, frames }) => {
    let ghostSprite = game.add.sprite(x, y, sprite);
    ghostSprite.animations.add('default', frames || null, 10, true);
    ghostSprite.play('default');
    ghostSprite.alpha = 0.5;
    return ghostSprite;
  });
};
