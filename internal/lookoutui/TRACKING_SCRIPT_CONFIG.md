# Example Lookout UI Configuration with Tracking Script

To enable a tracking script (like Umami, Google Analytics, Plausible, etc.) in the Lookout UI, add the `trackingScript` configuration to your Lookout configuration YAML file:

```yaml
uiConfig:
  # ... other UI configuration ...

  trackingScript:
    src: "http://localhost:3000/script.js"
    provider: "umami"  # Options: umami, plausible, google-analytics, custom
    attributes:
      data-website-id: "b92c8526-afb0-46c3-85d4-6878632efb01"
      # Add any other HTML attributes needed by your tracking script
```

## Examples

### Umami Analytics

```yaml
uiConfig:
  trackingScript:
    src: "https://analytics.yourdomain.com/script.js"
    provider: "umami"
    attributes:
      data-website-id: "your-website-id"
```

### Google Analytics

```yaml
uiConfig:
  trackingScript:
    src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
    provider: "google-analytics"
    attributes:
      async: "true"
```

### Plausible Analytics

```yaml
uiConfig:
  trackingScript:
    src: "https://plausible.io/js/script.js"
    provider: "plausible"
    attributes:
      data-domain: "yourdomain.com"
```

### Custom Analytics

```yaml
uiConfig:
  trackingScript:
    src: "https://your-analytics-server.com/tracking.js"
    provider: "custom"
    attributes:
      data-site-id: "your-site-id"
      data-api-endpoint: "https://your-analytics-server.com/api"
      # Add any custom attributes your tracking solution needs
```

## Using TrackingButton Component

The `provider` field enables automatic event tracking using the `TrackingButton` component. This component wraps MUI Button and automatically adds the correct tracking attributes based on your provider:

```tsx
import { TrackingButton } from "../components/TrackingButton"

// Simple usage
<TrackingButton eventName="Cancel Job">
  Cancel
</TrackingButton>

// With event data
<TrackingButton 
  eventName="Submit Job" 
  eventData={{ queue: "default", jobCount: "5" }}
  variant="contained"
>
  Submit
</TrackingButton>
```

The component automatically generates the correct attributes:
- **Umami**: `data-umami-event`, `data-umami-event-{key}`
- **Plausible**: `data-plausible-event`, `data-plausible-event-props`
- **Google Analytics**: `data-ga-event`, `data-ga-category`, `data-ga-label`
- **Custom**: `data-event`, `data-event-{key}`

## Notes

- The script will automatically have `defer` attribute added
- The script is injected dynamically when the app loads
- If no `trackingScript` configuration is provided, no tracking script will be loaded
- All attributes in the `attributes` map will be added to the `<script>` tag as HTML attributes
- The `provider` field determines which tracking attributes the `TrackingButton` component uses
