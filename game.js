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

        // Create a start button using graphics
        const startButton = this.add.graphics();
        startButton.fillStyle(0x00ff00, 1);
        startButton.fillRect(350, 400, 100, 50);
        startButton.setInteractive(new Phaser.Geom.Rectangle(350, 400, 100, 50), Phaser.Geom.Rectangle.Contains);

        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        this.add.text(375, 415, 'Start', { fontSize: '24px', fill: '#000' });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Create a simple background
        this.add.graphics().fillStyle(0x87ceeb, 1).fillRect(0, 0, 800, 600);
        this.add.graphics().fillStyle(0x228B22, 1).fillRect(0, 500, 800, 100);

        // Create the parrot
        this.parrot = this.add.graphics();
        this.parrot.fillStyle(0x00ff00, 1);
        this.parrot.fillRect(100, 450, 50, 50);

        // Enable physics for the parrot
        this.physics.world.enable(this.parrot);
        this.parrot.body.setCollideWorldBounds(true);

        // Create the bananas
        this.bananas = this.physics.add.group();

        for (let i = 0; i < 10; i++) {
            let banana = this.add.graphics();
            banana.fillStyle(0xffff00, 1);
            banana.fillRect(300 + i * 200, 400, 20, 20);
            this.physics.world.enable(banana);
            banana.body.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            this.bananas.add(banana);
        }

        // Add collider
        this.physics.add.collider(this.parrot, this.bananas, this.collectBanana, null, this);

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointerup', this.jump, this);
    }

    update() {
        if (this.cursors.up.isDown) {
            this.jump();
        }
    }

    jump() {
        if (this.parrot.body.touching.down) {
            this.parrot.body.setVelocityY(-350);
        }
    }

    collectBanana(parrot, banana) {
        banana.clear();
        banana.disableBody(true, true);
    }
}
