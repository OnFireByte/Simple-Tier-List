export default function textColorCalculate(hex) {
    const [_, r, g, b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const o = Math.round(
        (parseInt(r, 16) * 299 +
            parseInt(g, 16) * 587 +
            parseInt(b, 16) * 114) /
            1000
    );

    if (o > 100) {
        return '#000000';
    } else {
        return '#FFFFFF';
    }
}
