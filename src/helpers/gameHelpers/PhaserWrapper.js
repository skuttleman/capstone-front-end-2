import drawPlayer from './drawPlayer';
import drawWalls, { updateFrames } from './drawWalls';
import drawObjects, { drawGhosts } from './drawObjects';
import newGame from './initializeGame';

export default class PhaserWrapper {
  constructor({ name, dispatch, gameData, playerNumber, editMode, playable, getStore }) {
    let level = playerNumber === 1 ? gameData.player1 : gameData.player2;
    let { common, assets } = gameData;
    let all = level.concat(common);
    this.name = name;
    this.levelData = {
      assets,
      walls: common.filter(({ type }) => type === 'auto-wall'),
      player: level.find(({ type }) => type === 'player'),
      objects: all.filter(({ type }) => ['auto-wall', 'player'].indexOf(type) === -1)
    };
    this.walls = [];
    this.objects = [];
    this.player = null;
    this.ghosts = [];
    this.playerNumber = playerNumber;
    this.playable = playable;
    this.dispatch = dispatch;
    this.getStore = getStore;
    this.editMode = editMode;
    this.gameData = {...gameData};
    this.game = newGame(name, playerNumber || 1, this);
  }

  destroyGame() {
    if (this.game) {
      this.game.destroy();
      this.game = null;
    }
  }

  destroySprite(sprite) {
    if (sprite) sprite.kill();
    if (sprite && sprite.group) sprite.group.remove(sprite);
    if (sprite && sprite.parent) sprite.parent.removeChild(sprite);
  }

  destroyWalls() {
    this.walls.forEach(this.destroySprite);
    this.walls = [];
  }

  destroyObjects() {
    this.objects.forEach(this.destroySprite);
    this.objects = [];
  }

  destroyAllWalls() {
    this.games.forEach(game => {
      game.destroyWalls();
    });
  }

  destroyGhosts() {
    this.ghosts.forEach(this.destroySprite);
    this.ghosts = [];
  }

  destroyObject(object) {
    let index = this.objects.indexOf(object);
    if (index >= 0) {
      this.objects.splice(index, 1);
    }
    this.destroySprite(object);
  }

  destroyPlayer() {
    this.destroySprite(this.player);
    this.player = null;
  }

  loadAssets() {
    let { game } = this;
    this.levelData.assets.forEach(asset => {
      game.load[asset.type].apply(game.load, asset.args);
    });
  }

  drawWalls() {
    this.destroyWalls();
    this.walls = drawWalls(this.game, this.levelData.walls, 'default');
  }

  drawAllWalls(walls) {
    this.games.forEach(game => {
      game.levelData.walls = walls || [];
      game.drawWalls();
    });
  }

  updateAllWallSprites() {
    this.games.forEach(game => updateFrames(game, game.walls, 'default'));
  }

  drawGhosts(ghosts) {
    this.destroyGhosts();
    this.ghosts = drawGhosts(this.game, ghosts);
  }

  drawObjects() {
    this.destroyObjects();
    let { game, levelData: { objects } } = this;
    this.objects = drawObjects(game, objects);
  }

  drawPlayer() {
    this.destroyPlayer();
    let { game, levelData: { player } } = this;
    this.player = drawPlayer(game, player);
  }

  redraw() {
    this.drawObjects();
    this.drawPlayer();
    this.drawAllWalls(this.levelData.walls);
  }

  allPre() {
    let { levelData: data } = this;
    return data.walls.concat(data.objects).concat(data.player);
  }

  allPreOther() {
    let other = this.games.find(game => game !== this);
    if (other) {
      return other.allPre();
    }
    return [];
  }

  allPost() {
    return this.walls.concat(this.objects).concat(this.player);
  }

  allPostOther() {
    let other = this.games.find(game => game !== this);
    return other ? other.allPost() : [];
  }

  endGame() {
    console.log('end game');
    // this.dispatch({ type: 'END_GAME' });
  }
}
