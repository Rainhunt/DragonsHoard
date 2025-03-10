export default function returnEmptyAsUndefined<T extends object>(object: T) {
    return Object.values(object).some(value => value) ? object : undefined;
}