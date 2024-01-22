export default function bs_list(haystack: number[], needle: number): boolean {
    let lowerPoint = 0;
    let higherPoint = haystack.length;

    do {
        const middle = Math.floor(lowerPoint + (higherPoint - lowerPoint) / 2);
        const value = haystack[middle];

        if (value === needle) {
            return true;
        } else if (value > needle) {
            higherPoint = middle;
        } else {
            lowerPoint = middle + 1;
        }
    } while (lowerPoint < higherPoint);

    return false;
}
