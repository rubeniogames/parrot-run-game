// game.js

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [StartScene, GameScene]
};

const game = new Phaser.Game(config);

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    create() {
        this.add.text(300, 200, 'Parrot Run', { fontSize: '64px', fill: '#fff' });

        const startButton = this.add.text(350, 300, 'Start', { fontSize: '32px', fill: '#fff' });
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.add.image(400, 300, 'background'); // Jungle background

        this.parrot = this.physics.add.sprite(100, 450, 'parrot');
        this.parrot.setCollideWorldBounds(true);

        this.bananas = this.physics.add.group({
            key: 'banana',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.bananas.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.parrot, this.bananas, this.collectBanana, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.up.isDown && this.parrot.body.touching.down) {
            this.parrot.setVelocityY(-330);
        }
    }

    collectBanana(parrot, banana) {
        banana.disableBody(true, true);
    }
}

