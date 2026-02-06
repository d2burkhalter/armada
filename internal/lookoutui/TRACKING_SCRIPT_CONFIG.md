# Example Lookout UI Configuration with Tracking Script

To enable a tracking script (like Umami, Google Analytics, Plausible, etc.) in the Lookout UI, add the `trackingScript` configuration to your Lookout configuration YAML file:

```yaml
uiConfig:
  # ... other UI configuration ...

  trackingScript:
    src: "http://localhost:3000/script.js"
    attributes:
      data-website-id: "b92c8526-afb0-46c3-85d4-6878632efb01"
      # Add any other HTML attributes needed by your tracking script
    eventAttribute: "data-foo-event" # add css attribute for tracking events
    dataAttribute: "data-foo-event" # add css attribute for tracking event payloads
    trackedEvents: # list of eventNames to track
      - "Something Clicked"
```

## Examples

### Umami Analytics

```yaml
uiConfig:
  trackingScript:
    src: "https://analytics.yourdomain.com/script.js"
    attributes:
      data-website-id: "your-website-id"
    eventAttribute: "data-umami-event"
    dataAttribute: "data-umami-event"
    trackedEvents:
      - "Cancel Jobs Clicked"
      - "Reprioritize Jobs Clicked"
```

This will result in a tracking script being added to the `<head>` element and tracking attributes being added to elements

```html
<head>
  ...
  <script src="https://analytics.yourdomain.com/script.js" defer="" data-website-id="your-website-id"></script>
</head>
...
<button type="button" data-umami-event="Something Clicked" data-umami-event-yourevent="1">Something</button>
```

## Using TrackingButton Component

The `provider` field enables automatic event tracking using the `TrackingButton` component. This component wraps MUI Button and automatically adds the correct tracking attributes based on your provider:

```tsx
import { TrackingButton } from "../components/TrackingButton"

// Simple usage
<TrackingButton eventName="Something Clicked">
  Something
</TrackingButton>

// With event data
<TrackingButton
  eventName="Submit Job"
  eventData={{ foo: "bar", baz: "5" }}
>
  Submit
</TrackingButton>
```

## Notes

- The script will automatically have `defer` attribute added
- The script is injected dynamically when the app loads
- If no `trackingScript` configuration is provided, no tracking script will be loaded
- All attributes in the `attributes` map will be added to the `<script>` tag as HTML attributes
- The `provider` field determines which tracking attributes the `TrackingButton` component uses
