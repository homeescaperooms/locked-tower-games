import "../fonts.css";
import "../lib/style.css";
import "../lib/teapot/style.css";

import { setupInputBackend, spoofInputBackend } from "../lib/control/control.js";
import { initAfterLoad } from "../lib/init.js";
import { hideModal, showModal } from "../lib/meta/modal.js";
import { Answer, Game, Question, Round } from "../lib/teapot/types.js";
import { Timer } from "../lib/timer/timer.js";

/* config */
const DIFFICULTY = "easy"; // "easy" or "hard"
const HELP_TEXT = "hilfe für quiz wg";
const RESET_TIMER_SECONDS = 120;
const LIVES = {
    easy: 5,
    hard: 3,
};
const GAME_OVER_MESSAGE = `Du hast leider verloren. Drücke einen beliebigen Knopf, um neu zu starten.`;
const ROUND_AMOUNT = {
    easy: 4,
    hard: 6,
};

export const questionPool = [
    {
        question: "Was ist hier das beste Passwort?",
        answerOptions: ["Ichmagtiere", "xxxxShadowxxx", "hdudzdhdhdhd", "klUT13/%&"],
        correct: "klUT13/%&",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    {
        question: "Was wächst unter der Erde?",
        answerOptions: ["Tomaten", "Gurken", "Kartoffeln", "Salat"],
        correct: "Kartoffeln",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    { question: "...sind wirklich zum Heulen.", answerOptions: ["Knoblauchzehen", "Sellerie", "Zwiebeln", "Paprika "], correct: "Zwiebeln" },
    {
        question: "Welche der vier Zutaten kommt nicht in Energy Drinks vor? ",
        answerOptions: ["Wasser", "Zucker/Süßstoff", "Koffein", "Acrylamid"],
        correct: "Acrylamid",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    {
        question: "Wofür steht FOMO?",
        answerOptions: ["Fehler offerieren Mathe Optionen", "Fear of missing out", "Finally only mighty offers", "Feier only mit Optimismus"],
        correct: "Fear of missing out",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    {
        question: "Ab wie viel Jahren darfst du TikTok nutzen?",
        answerOptions: ["Elf Jahre", "Zwölf Jahre", "Dreizehn Jahre", "Vierzehn Jahre"],
        correct: "Dreizehn Jahre",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    {
        question: "Darf ich einfach Bilder von anderen Leuten auf mein Instagram hochladen?",
        answerOptions: [
            "Logo, ich hab das Bild ja gemacht. Urheberrecht Digger.",
            "Nur, wenn es keine peinlichen Bilder sind.",
            "Nee, ich muss ich die Leute schon fragen.",
            "Ich baller‘ alles hoch, mir egal!",
        ],
        correct: "Nee, ich muss ich die Leute schon fragen.",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    {
        question: "Was essen Veganer nicht?",
        answerOptions: ["Obst und Gemüse?", "Fisch, Milchprodukte und Käse?", "Kohlenhydrate und Mineralstoffe?", "Brot und Brötchen"],
        correct: "Fisch, Milchprodukte und Käse?",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    {
        question: "Was bedeutet „pasteurisiert“ bei einem Lebensmittel?",
        answerOptions: [
            "Es muss gekühlt werden.",
            "Es wurde erhitzt, um es haltbarer zu machen.",
            "Es darf nicht gekühlt werden.",
            "Es ist nur sehr kurz haltbar.",
        ],
        correct: "Es wurde erhitzt, um es haltbarer zu machen.",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    { question: "Woraus wird Popcorn gemacht?", answerOptions: ["Bohnen", "Mais", "Erbsen", "Flusskrebsen"], correct: "Mais" },
    {
        question: "Wie heißt der Effekt, der nach einer Diät eintreten kann? Durch ihn verliert man erst Gewicht und danach ist es wieder da. ",
        answerOptions: ["Jo-Jo-Effekt", "Flip-Flop-Effekt", "Kurven-Effekt", "Känguru-Effekt"],
        correct: "Jo-Jo-Effekt",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    {
        question: "Womit verdienen Influencer am meisten Geld?",
        answerOptions: ["Spenden", "Vorträge halten", "Product-Placement", "weiterer Nebenjob"],
        correct: "Product-Placement",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    {
        question: "Welches dieser Anzeichen, könnte auf eine Depression hinweisen?",
        answerOptions: ["Großes Selbstbewusstsein", "Kontaktfreudigkeit", "Interessenverlust", "Hohe Motivation für die Schule"],
        correct: "Interessenverlust",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    {
        question: "Welche Strategie hilft während des Sports durchzuhalten?",
        answerOptions: [
            "Sehr leicht und wenig herausfordernd trainieren",
            "Feste Zeiten und Tage festlegen",
            "Vor dem Sport Essen",
            "Sich vor allem für das positives Feedback anderer anstrengen",
        ],
        correct: "Feste Zeiten und Tage festlegen",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    {
        question: "Was können Anzeichen sein, dass ein:e Mitschüler:in unter Cybermobbing leidet",
        answerOptions: [
            "er/sie nutzt soziale Medien sehr intensiv",
            "er/sie geht nur ungern in die Schule & vermeidet Gruppenaktivitäten",
            "er/sie legt sich immer mit anderen an",
            "er/sie bleibt immer länger an der Schule",
        ],
        correct: "er/sie geht nur ungern in die Schule & vermeidet Gruppenaktivitäten",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    {
        question: "Was ist eine mögliche Begleiterkrankung einer Computerspielsucht?",
        answerOptions: ["Depression ODER Angstörungen", "Schizophrenie", "Persönlichkeitsstörungen", "Bluthochdruck"],
        correct: "Depression ODER Angstörungen",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    {
        question: "Welches Hashtag findet man häufig unter Bildern, die ein idealisiertes Körperbild präsentieren?",
        answerOptions: ["#bodypositivity", "#thighgap", "#nofilter", "#mehrrealitätaufinstagram"],
        correct: "#thighgap",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    {
        question: "Wie hinterlässt man Spuren im Internet?",
        answerOptions: ["Webcam", "Netzwerkkabel", "Cookies", "Bildschirm"],
        correct: "Cookies",
        type: "text",
        timer: { easy: 30, hard: 15 },
    },
    // images
    {
        question: "Von welcher dieser Lebensmittelgruppen, sollen wir laut Planetary Health Diet pro Tag am meisten zu uns nehmen?",
        answerOptions: [
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_true.png",
            "/content/quiz_wg/placeholder_false.png",
        ],
        correct: 3,
        type: "image",
        timer: { easy: 30, hard: 15 },
    },

    {
        question: "Welches dieser Nahrungsmittel kommt ursprünglich aus Südamerika?",
        answerOptions: [
            "/content/quiz_wg/placeholder_true.png",
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_false.png",
        ],
        correct: 1,
        type: "image",
        timer: { easy: 30, hard: 15 },
    },

    {
        question: "Welches Bundesland ist dies?",
        answerOptions: [
            "/content/quiz_wg/placeholder_true.png",
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_false.png",
        ],
        correct: 1,
        type: "image",
        timer: { easy: 30, hard: 15 },
    },

    {
        question: "Welches dieser 4 Icons gibt es nicht?",
        answerOptions: [
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_true.png",
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_false.png",
        ],
        correct: 2,
        type: "image",
        timer: { easy: 30, hard: 15 },
    },

    {
        question: "Wieviel Würfelzucker sind in einem klassischen Energy Drink?",
        answerOptions: [
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_true.png",
        ],
        correct: 4,
        type: "image",
        timer: { easy: 30, hard: 15 },
    },

    {
        question: "Welches Foto ist echt und nicht von einer KI generiert?",
        answerOptions: [
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_true.png",
            "/content/quiz_wg/placeholder_false.png",
        ],
        correct: 3,
        type: "image",
        timer: { easy: 30, hard: 15 },
    },

    {
        question: "Welches Bild wurde nachbearbeitet?",
        answerOptions: [
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_true.png",
            "/content/quiz_wg/placeholder_false.png",
            "/content/quiz_wg/placeholder_false.png",
        ],
        correct: 2,
        type: "image",
        timer: { easy: 30, hard: 15 },
    },
];

const ROUNDS = [];
let shuffledQuestionPool = questionPool.sort(() => Math.random() - 0.5);
for (let i = 0; i < ROUND_AMOUNT[DIFFICULTY]; i++) {
    let question = shuffledQuestionPool[i];
    if (question.type === "text") {
        let r = new Round(
            new Question().addStaticText(question.question),

            new Answer()
                .startButtonSet("row")
                .addTextButton(question.answerOptions[0], question.correct.trim() === question.answerOptions[0].trim(), "buttonA")
                .addTextButton(question.answerOptions[1], question.correct.trim() === question.answerOptions[1].trim(), "buttonB")
                .addTextButton(question.answerOptions[2], question.correct.trim() === question.answerOptions[2].trim(), "buttonC")
                .addTextButton(question.answerOptions[3], question.correct.trim() === question.answerOptions[3].trim(), "buttonD")
                .endButtonSet(),

            {
                timer: question.timer[DIFFICULTY],
            }
        );
        ROUNDS.push(r);
    } else if (question.type === "image") {
        let r = new Round(
            new Question().addStaticText(question.question),

            new Answer()
                .startButtonSet("row")
                .addImageButton(import.meta.env.BASE_URL + question.answerOptions[0], question.correct === 1, "buttonA")
                .addImageButton(import.meta.env.BASE_URL + question.answerOptions[1], question.correct === 2, "buttonB")
                .addImageButton(import.meta.env.BASE_URL + question.answerOptions[2], question.correct === 3, "buttonC")
                .addImageButton(import.meta.env.BASE_URL + question.answerOptions[3], question.correct === 4, "buttonD")
                .endButtonSet(),

            {
                timer: 30,
            }
        );
        ROUNDS.push(r);
    }
}

const onGameOver = () => {
    document.querySelector(".question-container").innerHTML = `<p>${GAME_OVER_MESSAGE}</p>`;

    document.querySelector(".answer-container").innerHTML = ``;
    document.querySelector("#timer")?.classList.add("disabled");

    resetTimer.stop();
    anyButtonRestarts = true;
};

let helpModal;
let resetTimer;
let anyButtonRestarts = false;

function onInput({ detail }) {
    const button = detail.button;
    console.log("btn", button);

    // on ANY input, reset timer
    if (resetTimer) resetTimer.reset();

    if (anyButtonRestarts) {
        resetGame();
        return;
    }

    if (button === "buttonStart") {
        //
    }

    if (button === "buttonHelp") {
        if (helpModal) {
            hideModal(helpModal);
            helpModal = null;
        } else {
            helpModal = showModal({
                text: HELP_TEXT,
            });
        }
    }

    // Disallow other key events when help is shown
    if (helpModal) return;

    // try to find button with this id
    const foundButton = document.querySelector(`button[data-button-event-id="${button}"]`);
    console.log(foundButton);
    if (foundButton) {
        foundButton.click();
    }
}

function resetGame() {
    // reload page
    window.location.reload();
}

function solveGame() {
    document.querySelector("a.solve").click();
}

initAfterLoad(() => {
    setupInputBackend();

    // spoof input
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            spoofInputBackend(4, "buttonStart");
        } else if (event.key === "Escape") {
            spoofInputBackend(4, "buttonHelp");
        } else if (event.key === "1") {
            spoofInputBackend(4, "buttonA");
        } else if (event.key === "2") {
            spoofInputBackend(4, "buttonB");
        } else if (event.key === "3") {
            spoofInputBackend(4, "buttonC");
        } else if (event.key === "4") {
            spoofInputBackend(4, "buttonD");
        }
    });

    // listen
    document.addEventListener("input:game4", onInput);

    // game specific
    resetTimer = new Timer(RESET_TIMER_SECONDS, () => {
        // timeout is up, navigate back to start
        document.querySelector("a.reset").click();
    });
    resetTimer.start();

    new Game(LIVES[DIFFICULTY], ROUNDS, solveGame, onGameOver).start();
});
