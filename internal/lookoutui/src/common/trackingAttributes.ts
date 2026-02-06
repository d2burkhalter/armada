/**
 * Builds tracking attributes based on the configured analytics provider
 * @param eventName The event name to track
 * @param eventData Optional event data to include with the tracking event
 * @returns An object containing the appropriate data attributes for the provider
 */
export function buildTrackingAttributes(
  eventName: string,
  eventAttribute: string,
  dataAttribute: string,
  eventData?: Record<string, string>,
): Record<string, string> {
  const trackingAttributes: Record<string, string> = {}

  trackingAttributes[eventAttribute] = eventName
  if (eventData) {
    Object.entries(eventData).forEach(([key, value]) => {
      trackingAttributes[`${dataAttribute}-${key}`] = value
    })
  }

  return trackingAttributes
}
