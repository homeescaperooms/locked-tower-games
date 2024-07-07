//import "../../lib/uibuilder/uibuilder.esm.min.js";

const INPUTS = Object.freeze({
    arduino_0: {
        inputCodes: {
            // game 1
            0: {
                game: 1,
                button: "buttonStart",
            },
            1: {
                game: 1,
                button: "buttonHelp",
            },
            2: {
                game: 1,
                button: "button1",
            },
            3: {
                game: 1,
                button: "button2",
            },
            4: {
                game: 1,
                button: "button3",
            },
            5: {
                game: 1,
                button: "button4",
            },
            6: {
                game: 1,
                button: "button5",
            },
            7: {
                game: 1,
                button: "button6",
            },
            // game 4
            8: {
                game: 4,
                button: "buttonStart",
            },
            9: {
                game: 4,
                button: "buttonHelp",
            },
            10: {
                game: 4,
                button: "buttonA",
            },
            11: {
                game: 4,
                button: "buttonB",
            },
            12: {
                game: 4,
                button: "buttonC",
            },
            13: {
                game: 4,
                button: "buttonD",
            },
        },
    },
    arduino_1: {
        inputCodes: {
            // game 2
            0: {
                game: 2,
                button: "buttonStart",
            },
            1: {
                game: 2,
                button: "buttonHelp",
            },
            2: {
                game: 2,
                button: "button1",
            },
            3: {
                game: 2,
                button: "button2",
            },
            4: {
                game: 2,
                button: "button3",
            },
            5: {
                game: 2,
                button: "button4",
            },
            6: {
                game: 2,
                button: "button5",
            },
            7: {
                game: 2,
                button: "button6",
            },
            8: {
                game: 2,
                button: "button7",
            },
            9: {
                game: 2,
                button: "button8",
            },
            // game 3
            10: {
                game: 3,
                button: "buttonStart",
            },
            11: {
                game: 3,
                button: "buttonHelp",
            },
            12: {
                game: 3,
                button: "buttonSolve",
            },
        },
    },
});

export function setupInputBackend() {
    return;
    uibuilder.onChange("msg", (msg) => {
        console.log("Got ui builder input. msg:", msg);

        const data = msg.payload.hasOwnProperty("in") ? msg.payload.in : msg.payload;
        const device = msg.topic;

        console.log("Determined payload and device", "payload:", data, "; device:", device);

        const keyIndex = data.findIndex((value) => value === 0);
        const inputData = INPUTS[device].inputCodes[keyIndex];

        console.log("Determined input data", inputData, " --sending event now");

        const event = new CustomEvent("input:game" + inputData.game, {
            detail: {
                button: inputData.button,
            },
        });
        document.dispatchEvent(event);
    });
}

export function spoofInputBackend(gameId, buttonId) {
    const event = new CustomEvent("input:game" + gameId, {
        detail: {
            button: buttonId,
        },
    });
    document.dispatchEvent(event);
}
