import movePlayer from './movePlayer';
import { editorClicks, messageClicks } from './handleClicks';

export default (name, number, game) => {
  game.destroyGame();
  return new Phaser.Game(800, 450, Phaser.AUTO, `${name}-${number}`, {
    preload: preload.bind(null, game),
    create: create.bind(null, game),
    update: update.bind(null, game)
  });
};

const preload = game => {
  game.loadAssets();
  game.cursorKeys = game.game.input.keyboard.createCursorKeys();
  game.mouse = game.game.input.mouse;
}

const create = game => {
  game.drawWalls();
  game.drawObjects();
  game.drawPlayer();
  if (game.editMode) {
    editorClicks(game);
  } else {
    messageClicks(game);
  }
};

const update = game => {
  if (game.playable) {
    // drawMessages(game);
    movePlayer(game);
  }
};
