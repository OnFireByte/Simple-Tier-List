export default function fontSize(string) {
    console.log([string, string.length]);
    const n = string.length;
    const calculated = Math.round((2.25 / Math.log(n + 1.72)) * 100) / 100;
    return `${calculated}rem`;
}
