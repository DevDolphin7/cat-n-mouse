const inquirer = require("inquirer");

class CatNMouse {
    loadGame(
        grid = [
            [" cat ", "  x  ", "  O  ", "mouse"],
            ["  x  ", "  x  ", "  x  ", "  x  "],
        ],
        catMovement = 2,
        mouseMovement = 1
    ) {
        this.gameGrid = grid;

        this.cat = new Creature(catMovement);
        this.mouse = new Creature(mouseMovement);

        console.log("Welcome to cat catcher!\n");
        console.log(
            `Cat movement: ${this.catMovement}, mouse movement: ${this.mouseMovement}\n`
        );
        console.log(this.gameGrid);
    }

    async playGame() {
        await this.getUserMove();
        // console.log("move: " + this.userMove);
        this.checkMovement();
    }

    async getUserMove() {
        await inquirer
            .prompt([
                {
                    type: "input",
                    name: "userMove",
                    message: "Use <wasd> to move around the grid: ",
                    validate: (input) => /^[wasd]{1}$/i.test(input),
                },
            ])
            .then((answer) => {
                this.userMove = answer.userMove;
            })
            .catch((error) => {
                console.log(`Unexpected error: ${error}`);
            });
    }

    checkMovement() {
        switch (true) {
            case /s/i.test(this.userMove):
                for (let i=1; i<=this.mouse.movement; i++) {
                    this.checkLoseCondition()
                }
                break;
            case /w/i.test(this.userMove):
                return true;
                break;
            case /a/i.test(this.userMove):
                return true;
                break;
            case /d/i.test(this.userMove):
                return false;
                break;
        }
    }
}

class Creature {
    constructor(movement, gridSize = 4) {
        this.movement = movement;

        const getRandomInt = (max) => Math.floor(Math.random() * max);
        this.row = getRandomInt(gridSize);
        this.col = getRandomInt(gridSize);
    }
}

let instance = new CatNMouse();
instance.loadGame();
instance.playGame();

module.exports = CatNMouse;
