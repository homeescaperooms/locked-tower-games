export const configGlobal = {
    // how many seconds of inacitivty resets the game to the start
    resetTimerSeconds: 300,

    // how many seconds to wait after a wrong answer before restarting the game
    // in game 3 you can't lose, so this is ignored
    // in game 4, the player needs to manually press a button to restart, so this is ignored
    autoRestartSeconds: 2,
};

export const configHateSpeech = {
    questionText: "Ordne die Hass-Kommentare gemäß ihrer zeitlichen Reihenfolge.",
    helpText: {
        easy: "Drücke die Schalter unter den vier gesuchten Profilen in der richtigen zeitlichen Abfolge:<br><br>Vom ältesten zum neuesten Kommentar.<br>Jeweils zwei Kommentare wurden am gleichen Tag gepostet, dabei bezieht sich die eine Person jeweils auf die andere.",
        hard: "Drücke die Schalter unter den sechs gesuchten Profilen in der richtigen zeitlichen Abfolge:<br><br>Vom ältesten zum neuesten Kommentar.<br>Jeweils zwei Kommentare wurden am gleichen Tag gepostet, dabei bezieht sich die eine Person jeweils auf die andere.",
    },
    gameOverText: "Das war leider falsch. Versuche es erneut!",
    comments: {
        easy: [
            "/content/hate_speech/R1_Level1_Kommentar1.png",
            "/content/hate_speech/R1_Level1_Kommentar2.png",
            "/content/hate_speech/R1_Level1_Kommentar3.png",
            "/content/hate_speech/R1_Level1_Kommentar4.png",
        ],
        hard: [
            "/content/hate_speech/R1_Level2_Kommentar1.png",
            "/content/hate_speech/R1_Level2_Kommentar2.png",
            "/content/hate_speech/R1_Level2_Kommentar3.png",
            "/content/hate_speech/R1_Level2_Kommentar4.png",
            "/content/hate_speech/R1_Level2_Kommentar5.png",
            "/content/hate_speech/R1_Level2_Kommentar6.png",
        ],
    },
    solutions: {
        easy: [3, 1, 5, 2],
        hard: [3, 6, 1, 4, 2, 5],
    },
};

export const configUnknownLanguage = {
    questionText: "Drücke die gesuchten Zahlen in der richtigen Reihenfolge,<br>um das Rätsel zu lösen.",
    helpText: {
        easy: "Drücke die vier gesuchten Zahlen in der richtigen Reihenfolge. <br> Die Anzahl der Striche außerhalb der Symbole hilft dir, den Zahlenwert der einzelnen Symbole zu ermitteln. Das erste Symbol steht für die „1“.",
        hard: "Drücke die sechs gesuchten Zahlen in der richtigen Reihenfolge. <br> Die Anzahl der Striche außerhalb der Symbole hilft dir, den Zahlenwert der einzelnen Symbole zu ermitteln. Das erste Symbol steht für die „8“.",
    },
    gameOverText: "Das war leider falsch. Versuche es erneut!",
    solutions: {
        easy: [1, 5, 6, 3],
        hard: [8, 4, 7, 2, 6, 3],
    },
};

export const configEmotions = {
    questionText: "Welche drei Emotionen durchlebt Noah in den Clips?",
    helpText: {
        easy: "Die drei Schieberegler müssen gleichzeitig bewegt werden. - Es hilft, beide Hände zu verwenden.",
        hard: "Die drei Schieberegler müssen gleichzeitig bewegt werden. - Es hilft, beide Hände zu verwenden.",
    },
};

export const configQuizWG = {
    questionText: "Hilf Noah bei den Fragen seines Schulprojekts.",
    helpText: {
        easy: "Beachte den Countdown für die einzelnen Fragen und die Anzahl an möglichen Fehlversuchen (grünes Herz).",
        hard: "Beachte den Countdown für die einzelnen Fragen und die Anzahl an möglichen Fehlversuchen (grünes Herz).",
    },
    gameOverText: `Du hast leider verloren. Drücke einen beliebigen Knopf, um neu zu starten.`,
    lifes: {
        easy: 3,
        hard: 2,
    },
    roundAmount: {
        easy: 5,
        hard: 7,
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
            question: "Womit verdienen Influencerinnen oder Influencer am meisten Geld?",
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
            question: "Was können Anzeichen sein, dass eine Mitschülerin oder ein Mitschüler unter Cybermobbing leidet?",
            answerOptions: [
                "Er oder sie nutzt soziale Medien sehr intensiv",
                "Er oder sie geht nur ungern in die Schule & vermeidet Gruppenaktivitäten",
                "Er oder sie legt sich immer mit anderen an",
                "Er oder sie bleibt immer länger an der Schule",
            ],
            correct: "Er oder sie geht nur ungern in die Schule & vermeidet Gruppenaktivitäten",
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
                "/content/quiz_wg/food_groups/Fleischprodukte.png",
                "/content/quiz_wg/food_groups/Milchprodukte.png",
                "/content/quiz_wg/food_groups/Obst-Gemuese_Richtig.png",
                "/content/quiz_wg/food_groups/Nuesse.png",
            ],
            correct: 3,
            type: "image",
            timer: { easy: 30, hard: 15 },
        },

        {
            question: "Welches dieser Nahrungsmittel kommt ursprünglich aus Südamerika?",
            answerOptions: [
                "/content/quiz_wg/food_south_africa/Kartoffel_Richtig.png",
                "/content/quiz_wg/food_south_africa/Zuckerruebe.png",
                "/content/quiz_wg/food_south_africa/Haselnuss.png",
                "/content/quiz_wg/food_south_africa/Apfel.png",
            ],
            correct: 1,
            type: "image",
            timer: { easy: 30, hard: 15 },
        },

        {
            question: "Welches dieser 4 Icons gibt es nicht?",
            answerOptions: [
                "/content/quiz_wg/social_media_icons/Icon_Instagram.png",
                "/content/quiz_wg/social_media_icons/Icon_FAKE.png",
                "/content/quiz_wg/social_media_icons/Icon_TikTok.png",
                "/content/quiz_wg/social_media_icons/Icon_YouTube.png",
            ],
            correct: 2,
            type: "image",
            timer: { easy: 30, hard: 15 },
        },

        {
            question: "Wieviel Gramm Zucker sind in einem klassischen Energy Drink?",
            answerOptions: [
                "/content/quiz_wg/sugar/5g.png",
                "/content/quiz_wg/sugar/10g.png",
                "/content/quiz_wg/sugar/30g.png",
                "/content/quiz_wg/sugar/60g_Richtig.png",
            ],
            correct: 4,
            type: "image",
            timer: { easy: 30, hard: 15 },
        },

        {
            question: "Welches Foto ist echt und nicht von einer KI generiert?",
            answerOptions: [
                "/content/quiz_wg/picture_ai/Barista-KI.png",
                "/content/quiz_wg/picture_ai/Cafe-KI.png",
                "/content/quiz_wg/picture_ai/Toertchen-Verkauf_Richtig.png",
                "/content/quiz_wg/picture_ai/Kuchen-Display-KI.png",
            ],
            correct: 3,
            type: "image",
            timer: { easy: 30, hard: 15 },
        },

        {
            question: "Welches Bild wurde nachbearbeitet?",
            answerOptions: [
                "/content/quiz_wg/picture_retouched/Gaense.png",
                "/content/quiz_wg/picture_retouched/Nebel_Richtig.png",
                "/content/quiz_wg/picture_retouched/See.png",
                "/content/quiz_wg/picture_retouched/Wald.png",
            ],
            correct: 2,
            type: "image",
            timer: { easy: 30, hard: 15 },
        },
    ],
};
