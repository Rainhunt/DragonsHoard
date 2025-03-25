export function getValueFromPath(path: string, object: any): unknown {
    const indexes = path.substring(1).split(".");
    let value = object;
    for (const index of indexes) {
        if (value && typeof value === 'object') {
            value = value[index];
        } else {
            return undefined;
        }
    }
    return value;
}

export function setValueFromPath(path: string, value: any, object: any) {
    const indexes = path.substring(1).split(".");
    const final = indexes.pop();
    let current = object;

    for (const index of indexes) {
        if (current && typeof current === 'object') {
            if (current[index] === undefined) current[index] = {};
            current = current[index];
        } else {
            throw new Error(`Path not found at ${index} in ${path}`);
        }
    }
    if (final && current && typeof current === 'object') {
        current[final] = value;
    } else {
        throw new Error(`Path not found at ${final} in ${path}`);
    }

    return object;
}