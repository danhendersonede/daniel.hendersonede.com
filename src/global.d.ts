interface PlausibleFunction {
  (eventName: string, options?: Record<string, unknown>): void;
  q?: (IArguments | unknown[])[];
}

declare global {
  interface Window {
    plausible: PlausibleFunction;
    fnames: string[];
  }

  function plausible(
    eventName: string,
    options?: Record<string, unknown>
  ): void;
}

export {};
