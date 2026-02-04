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
```

## Examples

### Umami Analytics

```yaml
uiConfig:
  trackingScript:
    src: "https://analytics.yourdomain.com/script.js"
    attributes:
      data-website-id: "your-website-id"
```

### Google Analytics

```yaml
uiConfig:
  trackingScript:
    src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
    attributes:
      async: "true"
```

### Plausible Analytics

```yaml
uiConfig:
  trackingScript:
    src: "https://plausible.io/js/script.js"
    attributes:
      data-domain: "yourdomain.com"
```

### Custom Analytics

```yaml
uiConfig:
  trackingScript:
    src: "https://your-analytics-server.com/tracking.js"
    attributes:
      data-site-id: "your-site-id"
      data-api-endpoint: "https://your-analytics-server.com/api"
      # Add any custom attributes your tracking solution needs
```

## Notes

- The script will automatically have `defer` attribute added
- The script is injected dynamically when the app loads
- If no `trackingScript` configuration is provided, no tracking script will be loaded
- All attributes in the `attributes` map will be added to the `<script>` tag as HTML attributes
