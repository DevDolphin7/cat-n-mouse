const inquirer = require("inquirer");

class CatNMouse {
    loadGame(
        grid = 4,
        catMovement = 2,
        mouseMovement = 1
    ) {
        this.cat = new Creature(catMovement);
        this.mouse = new Creature(mouseMovement);
        this.holeLocation = { row: 0, column: 2 };

        this.drawGrid(grid);

        console.log("Welcome to cat catcher!\n");
        console.log(
            `Cat movement: ${this.cat.movement}, mouse movement: ${this.mouse.movement}\n`
        );
        console.log(this.grid);
    }

    drawGrid(newGridSize = false) {
        if (newGridSize) {
            this.grid = [];
            console.log("Hello!", newGridSize)
            for (let i = 0; i < newGridSize; i++) {
                this.grid.push(Array(newGridSize).fill("  x  "));
            }
        }
        
        this.grid[this.cat.location.row][this.cat.location.column] = " cat "
        this.grid[this.mouse.location.row][this.mouse.location.column] = "mouse"
        this.grid[this.holeLocation.row][this.holeLocation.column] = "  O  "
    }

    async playGame() {
        await this.getUserMove();
        this.checkMovement();
        this.checkWinLoseConditions();
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
                for (let i = 1; i <= this.mouse.movement; i++) {
                    this.newMouseLocation = {
                        row: this.mouse.location.row + this.mouse.movement,
                        column: this.mouse.location.column,
                    };
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

    checkWinLoseConditions() {
        const objectComparitor = (object1, object2) => {
            const { row, column } = object1;
            const matchingRow = row === object2.row;
            const matchingColumn = column === object2.column;
            return matchingRow && matchingColumn;
        };

        if (objectComparitor(this.newMouseLocation, this.cat.location)) {
            console.log("You lose");
        } else if (objectComparitor(this.newMouseLocation, this.holeLocation)) {
            return;
        } else {
            this.mouse.location = this.newMouseLocation;
        }
    }
}

class GridItem {
    constructor(gridSize = 4){

    }
}

class Creature {
    constructor(movement) {
        this.movement = movement;
        
        const getRandomInt = (max) => Math.floor(Math.random() * max);
        this.location = { row: getRandomInt(gridSize), column: getRandomInt(gridSize) };
    }
}

let instance = new CatNMouse();
instance.loadGame();
instance.playGame();

module.exports = CatNMouse;
