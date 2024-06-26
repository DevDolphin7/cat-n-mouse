const inquirer = require("inquirer");

class CatNMouse {
    loadGame(
        grid = [["cat", "x", "O", "mouse"]],
        catMovement = 2,
        mouseMovement = 1
    ) {
        this.gameGrid = grid;
        this.catMovement = catMovement;
        this.mouseMovement = mouseMovement;
        console.log("Welcome to cat catcher!\n");
        console.log(
            `Cat movement: ${this.catMovement}, mouse movement: ${this.mouseMovement}\n`
        );
        console.log(this.gameGrid);
    }

    playGame() {
        this.getUserMove();
    }

    getUserMove() {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "userMove",
                    message: "Use <wasd> to move around the grid: ",
                    validate: input => /^[wasd]{1}$/i.test(input),
                },
            ])
            .then((answer) => {
                console.log(answer);
            });
    }
}

let instance = new CatNMouse();
instance.loadGame();
instance.playGame();

module.exports = CatNMouse;
