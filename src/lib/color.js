export function colorOverwrite(anchor, config) {
    if (!config) return;

    let anchorStyle = anchor.style.cssText;
    if (anchorStyle.length > 0 && anchorStyle.endsWith(";") === false) {
        anchorStyle += ";";
    }

    for (const [colorName, colorValue] of Object.entries(config)) {
        anchorStyle += `${colorName}: ${colorValue};`;
    }

    anchor.style.cssText = anchorStyle;
}
