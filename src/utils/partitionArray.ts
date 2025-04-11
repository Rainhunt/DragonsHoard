export default function partitionArray<K extends unknown>(array: K[], filter: (value: K, index: number, array: K[]) => boolean) {
    const pass: K[] = [];
    const reject: K[] = [];
    array.forEach((value, index) => {
        if (filter(value, index, array)) {
            pass.push(value);
        } else {
            reject.push(value);
        }
    });
    return { pass, reject };
}