export default function randomColor() {
    let h = Math.floor(Math.random() * 361);
    let s = Math.floor(Math.random() * 11) + 80;
    let l = Math.floor(Math.random() * 11) + 35;
    // hsl to hex algorithm
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}
