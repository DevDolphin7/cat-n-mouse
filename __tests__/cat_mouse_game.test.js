// `npm init` (can add -y for easy response but won't include license etc...)
// `npm install --save-dev jest` (can use -D instead)
// If you'd used `npm init -y`, don't forget to change "test" to equal "jest" in package.json

const game = require("../cat_mouse_game.js");

// Make a game that takes a text input from the user, "w", "a", "s", or "d" to move a mouse around an array printed in the terminal.
// A cat will try to catch the mouse in as few a turns as possible, the mouse must get to the hole: "O".
// Moving each space (denoted as "x") costs 1 movement
// The developer should be able to:
// - Provide an array, or an array or arrays (of the same length) to define the grid, otherwise defaults will be used. Only 1 cat, 1 mouse and 1 hole should exist.
// - Define the cat and mouse movement per turn, or defaults will be used.

describe("Game loading tests", () => {
    let instance = new game();
    instance.loadGame();

    // Happy tests
    test("It should have a grid (array of arrays of the same length) to play on", () => {
        expect(Array.isArray(instance.gameGrid)).toBeTruthy();
        let rowLength = instance.gameGrid[0].length
        instance.gameGrid.forEach((row) => {
            expect(Array.isArray(row)).toBeTruthy();
            expect(row.length === rowLength).toBeTruthy();
            rowLength = row.length
        })
    });
    test("It should have some cat and mouse movement", () => {
        expect(instance.catMovement > 0).toBeTruthy();
        expect(instance.mouseMovement > 0).toBeTruthy();
    });

    // Sad tests
    test('The grid should contain exactly 1 "cat", "mouse" and "O"', () => {
        // This test is not complete! 2 copies of the same keyword could fake the test.
        let keywords = []
        instance.gameGrid.forEach((row) => {
            keywords = row.map((gridElement) => ["cat", "mouse", "O"].includes(gridElement))
        })
        keywords = keywords.filter((bool) => bool)
        console.log(keywords.length)
        expect(keywords.length).toBe(3)
    });
    test("The cat and mouse movement should be positive integers > 0", () => {
        ["catMovement", "mouseMovement"].forEach((property) => {
            expect(typeof instance[property]).toBe("number");
            expect(instance[property] > 0).toBeTruthy();
        })
    });
});

describe("Game play tests", () => {
    let instance = new game();
    instance.loadGame();

    // Happy tests
    test("The game recieves input from the user", async () => {
        return instance.playGame().then(expect(instance.input).not.toBeUndefined())
    })
})
