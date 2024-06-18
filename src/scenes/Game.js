import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'background').setAlpha(0.5);

        this.add.rectangle(0, 400, 800, 200, 0xffffff).setOrigin(0, 0);
        const ground = this.physics.add.staticBody(0, 400, 800, 200);

        this.player = this.physics.add.sprite(100, 400, 'player');
        this.player.setOrigin(0, 1);
        this.player.setFlipX(true);
        this.player.play('run');

        this.rockVelocity = 200;
        this.rock = this.physics.add.sprite(500, 400, 'rock');
        this.rock.setVelocityX(-this.rockVelocity);
        this.rock.setOrigin(0, 1);
        
        this.physics.add.collider(this.player, ground);
        this.physics.add.collider(this.rock, ground);
        this.physics.add.overlap(this.rock, this.player, this.gameOver, null, this);

        this.score = 0.0;
        this.highScore = 0.0;
        this.scoreDisplay = this.add.text(100, 100, this.score.toString(), {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 2
        });

        this.input.keyboard.on('keydown-SPACE', this.playerJump, this);

        this.input.once('pointerdown', () => {

            this.scene.start('Menu');

        });
    }

    update ()
    {
        this.score += 0.1;

        this.displayScore();

        if (!this.player.body.touching.down) {
            this.player.play('jump');
        } else if (!this.player.body.wasTouching.down) {
            this.player.play('run');
        }

        if (this.rock.x < -32) {
            this.rock.x = 800;
        }

        this.rockVelocity += 0.1;
        this.rock.setVelocityX(-this.rockVelocity);
    }

    displayScore()
    {
        let scoreText = this.score.toFixed(0).toString() + ' m';
        if (this.highScore > 0.0) {
            scoreText += '\nHigh Score: ' + this.highScore.toFixed(0).toString() + ' m';
        }

        this.scoreDisplay.setText(scoreText);
    }

    playerJump()
    {
        if (this.player.body.touching.down) {
            this.player.body.setVelocityY(-500);
        }
    }

    gameOver()
    {
        this.player.disableBody();
        this.rock.disableBody();

        if (this.score > this.highScore) {
            this.highScore = this.score;
        }

        this.player.play('fall');
        
        this.time.addEvent({
            'delay': 1000,
            'callback': this.restart,
            'callbackScope': this
        })
    }

    restart()
    {
        this.player.enableBody();
        this.rock.enableBody();

        this.rockVelocity = 200;
        this.score = 0;
        this.rock.x = 800;
        this.player.play('run');
    }
}
