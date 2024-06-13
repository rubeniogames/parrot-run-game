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

    preload() {
        this.load.image('startButton', 'assets/startButton.png');
    }

    create() {
        this.add.text(300, 200, 'Parrot Run', { fontSize: '64px', fill: '#fff' });
        const startButton = this.add.image(400, 400, 'startButton').setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('background', 'assets/jungle.png');
        this.load.image('parrot', 'assets/parrot.png');
        this.load.image('banana', 'assets/banana.png');
    }

    create() {
        this.add.image(400, 300, 'background');

        this.parrot = this.physics.add.sprite(100, 450, 'parrot').setScale(0.5);
        this.parrot.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointerup', this.jump, this);

        this.bananas = this.physics.add.group({
            key: 'banana',
            repeat: 10,
            setXY: { x: 300, y: 0, stepX: 200 }
        });

        this.bananas.children.iterate(function (banana) {
            banana.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.parrot, this.bananas, this.collectBanana, null, this);
    }

    update() {
        if (this.cursors.up.isDown) {
            this.jump();
        }
    }

    jump() {
        if (this.parrot.body.touching.down) {
            this.parrot.setVelocityY(-350);
        }
    }

    collectBanana(parrot, banana) {
        banana.disableBody(true, true);
    }
}
