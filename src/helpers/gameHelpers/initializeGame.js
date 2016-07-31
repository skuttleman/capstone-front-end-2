import movePlayer from './movePlayer';
import { editorClicks, messageClicks } from './handleClicks';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants/gameProps';

export default (name, number, game) => {
  let id = `${name}-${number}`;
  game.destroyGame();
  return new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO, id, {
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
  let { gameData: { worldBounds: { upperLeft, lowerRight } } } = game;
  game.drawSprites();
  if (game.editMode) {
    game.rebound(50);
    editorClicks(game);
  } else {
    game.rebound(0);
    messageClicks(game);
  }
  if (game.createSubs) game.createSubs.forEach(action => action());
};

const update = game => {
  if (game.playable) {
    // drawMessages(game);
    movePlayer(game);
  }
};
