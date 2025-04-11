export default function parseFractional(value: string) {
    switch (value) {
        case "\u215b":
            return 0.125;
        case "\u00bc":
            return 0.25;
        case "\u00bd":
            return 0.5;
        default:
            return +value || 0;
    }
}