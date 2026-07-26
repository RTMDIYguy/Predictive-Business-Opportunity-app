import * as amplitude from '@amplitude/unified';

let initialized = false;

export function initAmplitude(): void {
  if (typeof window === 'undefined' || initialized) {
    return;
  }

  initialized = true;
  amplitude.initAll('f26c675c7e19c61b44a4848cd872e594', {
    analytics: { autocapture: true },
    sessionReplay: { sampleRate: 1 },
  });
}

export function trackEvent(
  eventName: string,
  eventProperties?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined' || !initialized) {
    return;
  }

  amplitude.track(eventName, eventProperties);
}
