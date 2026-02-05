import { TrackingScriptConfig } from "../config"

/**
 * Builds tracking attributes based on the configured analytics provider
 * @param provider The analytics provider (umami, plausible, google-analytics, custom)
 * @param eventName The event name to track
 * @param eventData Optional event data to include with the tracking event
 * @returns An object containing the appropriate data attributes for the provider
 */
export function buildTrackingAttributes(
  provider: TrackingScriptConfig["provider"],
  eventName: string,
  eventData?: Record<string, string>,
): Record<string, string> {
  const trackingAttributes: Record<string, string> = {}

  switch (provider) {
    case "umami":
      trackingAttributes["data-umami-event"] = eventName
      if (eventData) {
        Object.entries(eventData).forEach(([key, value]) => {
          trackingAttributes[`data-umami-event-${key}`] = value
        })
      }
      break
  }

  return trackingAttributes
}
