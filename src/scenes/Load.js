import { Scene } from 'phaser';

export class Load extends Scene
{
    constructor ()
    {
        super('Load');
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
        
        this.load.image('rock', 'rock.png');
        this.load.image('background', 'bg.png');
        this.load.spritesheet('player', 'player.png', {
            frameWidth: 58,
            frameHeight: 58
        });
    }

    create ()
    {
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 7
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', {
                start: 13,
                end: 17
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('player', {
                start: 18,
                end: 21
            }),
            frameRate: 12,
            repeat: 0,
        });

        this.scene.start('Menu');
    }
}
