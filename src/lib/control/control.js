export const inputGeneric = Object.freeze({
    BUTTON_START: "buttonStart",
    BUTTON_HELP: "buttonHelp",
});

export function onInputGeneric(keyName, cb) {
    cb(keyName);
}

export const inputHateSpeech = Object.freeze({
    BUTTON_1: "hateSpeech_button1",
    BUTTON_2: "hateSpeech_button2",
    BUTTON_3: "hateSpeech_button3",
    BUTTON_4: "hateSpeech_button4",
    BUTTON_5: "hateSpeech_button5",
    BUTTON_6: "hateSpeech_button6",
    BUTTON_7: "hateSpeech_button7",
    BUTTON_8: "hateSpeech_button8",
});

export function onInputHateSpeech(keyName, cb) {
    cb(keyName);
}

export const inputUnknownLanguage = Object.freeze({
    BUTTON_1: "unknownLanguage_button1",
    BUTTON_2: "unknownLanguage_button2",
    BUTTON_3: "unknownLanguage_button3",
    BUTTON_4: "unknownLanguage_button4",
    BUTTON_5: "unknownLanguage_button5",
    BUTTON_6: "unknownLanguage_button6",
    BUTTON_7: "unknownLanguage_button7",
    BUTTON_8: "unknownLanguage_button8",
});

export function onInputUnknownLanguage(keyName, cb) {
    cb(keyName);
}

export const inputEmotions = Object.freeze({
    BUTTON_SOLVED: "emotion_buttonSolved",
});

export function onInputEmotions(keyName, cb) {
    cb(keyName);
}