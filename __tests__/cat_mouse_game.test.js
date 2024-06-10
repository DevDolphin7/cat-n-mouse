// `npm init` (can add -y for easy response but won't include license etc...)
// `npm install --save-dev jest` (can use -D instead)
// If you'd used `npm init -y`, don't forget to change "test" to equal "jest" in package.json

const game = require("../cat_mouse_game.js")

// Make a game that takes a text input from the user, "w", "a", "s", or "d" to move a mouse around an array printed in the terminal.
// A cat will try to catch the mouse in as few a turns as possible, the mouse must get to the hole: "O".
// The developer should be able to:
    // - Provide an array, or an array or arrays (of the same length) to define the grid, otherwise defaults will be used. Only 1 cat, 1 mouse and 1 hole should exist.
    // - Define the cat and mouse movement per turn, or defaults will be used.

describe("Game loading tests", () => {
    let instance = new game()
    instance.loadGame()

    test("Successfully loading the game should return true", () => {
        expect(instance.gameLoaded).toBeTruthy()
    })
    test("It should have a grid (array) to play on", () => {
        expect(Array.isArray(instance.gameGrid)).toBeTruthy()
    })
    test("The grid should contain exactly 1 \"cat\"", () => {
        let testGrid = instance.gameGrid.filter((x) => x === "cat")
        expect(testGrid.length).toBe(1)
    })
    test("The grid should contain exactly 1 \"mouse\"", () => {
        let testGrid = instance.gameGrid.filter((x) => x === "mouse")
        expect(testGrid.length).toBe(1)
    })
})