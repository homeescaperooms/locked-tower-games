export const configGlobal = {
    resetTimerSeconds: 120, // how many seconds of inacitivty resets the game to the start
    autoRestartSeconds: 2, // how many seconds to wait after a wrong answer before restarting the game
};

export const configHateSpeech = {
    questionText: "frage 1",
    helpText: "hilfe für hate speech",
    gameOverText: "Das war leider falsch. Versuche es erneut!",
    solutions: {
        easy: [1, 2, 3, 4],
        hard: [6, 5, 4, 3, 2, 1],
    },
};

export const configUnknownLanguage = {
    questionText: "frage 2",
    helpText: "hilfe für unknown language",
    gameOverText: "Das war leider falsch. Versuche es erneut!",
    colorOverwrite: {
        "--color-primary": "var(--color-aok-green-lighter)",
        "--color-text-inverted": "orange",
    },
    buttonMap: {
        button1: "A",
        button2: "B",
        button3: "C",
        button4: "D",
        button5: "E",
        button6: "F",
        button7: "G",
        button8: "H",
    },
    solutions: {
        easy: ["A", "B", "C", "D"],
        hard: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
};

export const configEmotions = {
    questionText: "frage 3",
    helpText: "hilfe für emotions",
};

export const configQuizWG = {
    questionText: "frage 4",
    helpText: "hilfe für quiz wg",
    gameOverText: `Du hast leider verloren. Drücke einen beliebigen Knopf, um neu zu starten.`,
    lifes: {
        easy: 5,
        hard: 3,
    },
    roundAmount: {
        easy: 4,
        hard: 6,
    },
    questionPool: [
        // text
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
        {
            question: "...sind wirklich zum Heulen.",
            answerOptions: ["Knoblauchzehen", "Sellerie", "Zwiebeln", "Paprika "],
            correct: "Zwiebeln",
            type: "text",
            timer: { easy: 30, hard: 15 },
        },
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
        {
            question: "Woraus wird Popcorn gemacht?",
            answerOptions: ["Bohnen", "Mais", "Erbsen", "Flusskrebsen"],
            correct: "Mais",
            type: "text",
            timer: { easy: 30, hard: 15 },
        },
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
    ],
};
