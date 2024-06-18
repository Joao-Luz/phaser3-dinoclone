import { Game } from './scenes/Game';
import { Load } from './scenes/Load';
import { Menu } from './scenes/Menu';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Load,
        Menu,
        Game
    ],

    render: {
        pixelArt: true,
    },

    scale: {
        zoom: 2
    },

    physics: {
        default: "arcade",
        arcade:{
            gravity: {y: 980},
            debug: false
        }
      }
};

export default new Phaser.Game(config);
