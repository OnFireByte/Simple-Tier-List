export default function fontSize(string) {
    const n = string.length;
    const calculated =
        Math.round((2.25 / Math.log((n + 1.71828) / 0.85) + 0.315) * 100) / 100;

    return `${calculated}rem`;
}
