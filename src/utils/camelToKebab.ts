export default function camelToKebab(string: string) {
    return string.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}