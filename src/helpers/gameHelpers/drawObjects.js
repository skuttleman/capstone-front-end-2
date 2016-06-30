export default (game, objects) => {
  return objects.map(object => {
    let { position: { x, y }, sprite, frames } = object;
    let objectSprite = game.add.sprite(x, y, sprite);
    objectSprite.animations.add('default', frames || null, 10, true);
    objectSprite.play('default');
    objectSprite.custom = {...object};
    return objectSprite;
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
