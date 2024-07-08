const ls = localStorage;

export function setDifficulty(dif) {
    ls.setItem("locked-tower-difficulty", dif);
}

export function getDifficulty() {
    return ls.getItem("locked-tower-difficulty") || "easy";
}
