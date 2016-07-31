import drawPlayer from './drawPlayer';
import drawSprites, { drawGhosts, updateFrames } from './drawSprites';
import newGame from './initializeGame';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../constants/gameProps';

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

  rebound(offset = 0) {
    let { upperLeft, lowerRight } = this.gameData.worldBounds;
    let bounds = [
      upperLeft.x, upperLeft.y, lowerRight.x, lowerRight.y
    ].map((value, i) => i <= 1 ? value - offset : value + (offset * 2));
    this.game.world.setBounds.apply(this.game.world, bounds);
    if (this.createSubs) this.createSubs.forEach(action => action());
  }

  resetBounds() {
    let { upperLeft, lowerRight } = this.gameData.worldBounds;
    upperLeft.x = 0;
    upperLeft.y = 0;
    lowerRight.x = CANVAS_WIDTH;
    lowerRight.y = CANVAS_HEIGHT;
  }

  recalculateBounds(reset) {
    let { upperLeft, lowerRight } = this.gameData.worldBounds;
    if (reset) this.resetBounds();
    this.allPre().forEach(({ position }) => {
      ['x', 'y'].forEach(axis => {
        upperLeft[axis] = Math.min(position[axis], upperLeft[axis]);
        lowerRight[axis] = Math.max(position[axis] + 50, lowerRight[axis]);
      });
    });
    this.rebound(this.editMode ? 50 : 0);
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

  drawSprites() {
    this.drawWalls();
    this.drawObjects();
    this.drawPlayer();
  }

  drawWalls() {
    this.destroyWalls();
    this.walls = drawSprites(this.game, this.levelData.walls, this.levelData.assets);
  }

  drawAllWalls(walls) {
    this.games.forEach(game => {
      game.levelData.walls = walls || [];
      game.drawWalls();
    });
  }

  updateAllWallSprites() {
    this.games.forEach(game => updateFrames(game, game.walls));
  }

  drawGhosts(ghosts) {
    this.destroyGhosts();
    this.ghosts = drawGhosts(this.game, ghosts);
  }

  drawObjects() {
    let { game, levelData: { objects } } = this;
    this.destroyObjects();
    this.objects = drawSprites(game, objects, this.levelData.assets);
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

  subscribeCreated(action) {
    this.createSubs = this.createSubs || [];
    this.createSubs.push(action);
    return {};
  }

  endGame() {
    console.log('end game');
    // this.dispatch({ type: 'END_GAME' });
  }
}
