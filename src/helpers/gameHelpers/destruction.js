export const destroySprite = sprite => {
  sprite && sprite.kill();
  sprite.group && sprite.group.remove(sprite);
  sprite.parent && sprite.parent.removeChild(sprite);
};

// export const destroyGameWorld = (gameWorlds, name) => {
//   let game = gameWorlds[name];
//   game && game.destroy();
//   delete gameWorlds[name];
// };
