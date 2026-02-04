import { Button, ButtonProps } from "@mui/material"
import { forwardRef } from "react"

import { getConfig } from "../config"

interface TrackingButtonProps extends ButtonProps {
  /**
   * The event name to track when the button is clicked
   */
  eventName: string
  /**
   * Optional event data to include with the tracking event
   */
  eventData?: Record<string, string>
}

/**
 * A button component that automatically adds the correct tracking attributes
 * based on the configured analytics provider (Umami, Plausible, Google Analytics, etc.)
 *
 * Usage:
 * ```tsx
 * <TrackingButton eventName="Cancel Job" eventData={{ jobId: job.id }}>
 *   Cancel
 * </TrackingButton>
 * ```
 */
export const TrackingButton = forwardRef<HTMLButtonElement, TrackingButtonProps>(
  ({ eventName, eventData, ...buttonProps }, ref) => {
    const config = getConfig()
    const trackingConfig = config.trackingScript

    // Build the tracking attributes based on provider
    const trackingAttributes: Record<string, string> = {}

    if (trackingConfig?.provider) {
      switch (trackingConfig.provider) {
        case "umami":
          trackingAttributes["data-umami-event"] = eventName
          if (eventData) {
            Object.entries(eventData).forEach(([key, value]) => {
              trackingAttributes[`data-umami-event-${key}`] = value
            })
          }
          break

        case "plausible":
          trackingAttributes["data-plausible-event"] = eventName
          if (eventData) {
            // Plausible uses JSON in a single attribute for event properties
            trackingAttributes["data-plausible-event-props"] = JSON.stringify(eventData)
          }
          break

        case "google-analytics":
          trackingAttributes["data-ga-event"] = eventName
          trackingAttributes["data-ga-category"] = eventData?.category ?? "button"
          if (eventData?.label) {
            trackingAttributes["data-ga-label"] = eventData.label
          }
          break

        case "custom":
          // For custom tracking, use generic data-event attributes
          trackingAttributes["data-event"] = eventName
          if (eventData) {
            Object.entries(eventData).forEach(([key, value]) => {
              trackingAttributes[`data-event-${key}`] = value
            })
          }
          break
      }
    }

    return <Button ref={ref} {...buttonProps} {...trackingAttributes} />
  },
)

TrackingButton.displayName = "TrackingButton"
