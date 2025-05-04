type RetryOptions = {
    maxRetries: number;
    baseDelay: number;
    fnName?: string;
}

export default async function retryWithBackoff<R>(fn: () => Promise<R>, options: RetryOptions = { maxRetries: 5, baseDelay: 1000 }) {
    const label = `<${options.fnName || fn.name || "anonymous"}>`;
    for (let attempt = 0; attempt < options.maxRetries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            const delay = options.baseDelay * Math.pow(2, attempt);
            console.warn(`${label} failed. Retrying in ${(delay / 1000).toFixed(2)}s: ${err}`);
            await new Promise(resolve => setTimeout(resolve, delay + Math.random() * 200)); //delay + jitter
        }
    }
    throw new Error(`${label} failed after ${options.maxRetries} attempts`);
}