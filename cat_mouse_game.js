class CatNMouse {
    loadGame(grid=[["cat", "x", "O", "mouse"]], catMovement=2, mouseMovement=1) {
        this.gameGrid = grid
        this.catMovement = catMovement
        this.mouseMovement = mouseMovement
        console.log("Welcome to cat catcher!\n\n")
        console.log(`Cat movement: ${this.catMovement}, mouse movement: ${this.mouseMovement}\n`)
        console.log(this.gameGrid)
}

    playGame() {
        this.input = prompt("What is your move?")
    }
}

module.exports = CatNMouse