import Game from './Game';

class Controls {
  game: Game;
  constructor(game: Game) {
    this.game = game;
    this.bindControls();
  }

  bindControls() {
    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();

      switch(key) {
        case 'w':
        case 's':
          this.game.player.startAnimation(key);
          break;
        case 'p':
          this.toggleGame();
          break;
        case 'escape':
          this.game.reset();
          break;
        default:
          break;
      }
    });
    window.addEventListener('keyup', (e) => this.game.player.stopAnimation());
  }

  toggleGame() {
    if(this.game.active) {
      this.game.pause();
    } else {
      this.game.start();
    }
  }
}

export default Controls;