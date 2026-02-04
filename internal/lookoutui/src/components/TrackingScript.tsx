import { useEffect } from "react"

import { TrackingScriptConfig } from "../config/types"

interface TrackingScriptProps {
  config: TrackingScriptConfig | undefined
}

/**
 * Component that dynamically injects a tracking script into the document head
 * based on the configuration provided.
 */
export const TrackingScript = ({ config }: TrackingScriptProps) => {
  useEffect(() => {
    if (!config?.src) {
      return
    }

    const script = document.createElement("script")
    script.src = config.src
    script.defer = true

    // Add any additional attributes from the config
    if (config.attributes) {
      Object.entries(config.attributes).forEach(([key, value]) => {
        script.setAttribute(key, value)
      })
    }

    document.head.appendChild(script)

    // Cleanup function to remove the script when component unmounts
    return () => {
      document.head.removeChild(script)
    }
  }, [config])

  return null
}
