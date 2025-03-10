export default function throttle<T extends (...args: any[]) => void>(time: number, callback: T): T {
    let lastCall = 0;
    return function (...args: Parameters<T>) {
        const now = Date.now();
        if (now - lastCall >= time) {
            callback(...args);
            lastCall = now;
        }
    } as T;
}