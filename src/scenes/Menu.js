import { Scene } from 'phaser';

export class Menu extends Scene
{
    constructor ()
    {
        super('Menu');
    }

    create ()
    {

        this.add.image(512, 384, 'background');

        this.add.text(400, 460, 'Play', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
