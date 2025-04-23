declare global {
    interface Window {
        plausible: any;
        fnames: string[];
    }
}

declare function plausible(eventName: string, options?: Record<string, any>): void;

export { };