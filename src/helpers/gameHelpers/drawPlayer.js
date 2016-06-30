export default (game, player) => {
  if (!player) return null;
  let { position: { x, y }, sprite, frames } = player;
  let playerSprite = game.add.sprite(x, y, sprite);
  playerSprite.animations.add('default', frames || null, 10, true);
  playerSprite.animations.play('default');
  playerSprite.custom = {...player};
  return playerSprite;
};
