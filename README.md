# Open Graph Tag Generator

Generate Open Graph and Twitter Card meta tags with a live social share preview, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/seo-tools/og-generator

## How It Works

`escAttr(str)` encodes `&`, `"`, `<`, and `>` for safe attribute value embedding. `addOgTag(lines, property, content)` emits `<meta property="og:..." content="...">` only if the content is non-empty. `addTwitterTag` emits `<meta name="twitter:..." content="...">`. `updatePreview` updates a live social-card preview: the domain is extracted from the URL field using `new URL(url).hostname` in a try/catch, then converted to uppercase for the site name display. The image preview uses `backgroundImage: url(...)` style. The output is split into two sections with HTML comments: "Open Graph Tags" and "Twitter Card Tags".

## Features

- Open Graph tags: og:title, og:description, og:type, og:url, og:site_name, og:image, og:locale
- Twitter Card tags: twitter:card, twitter:title, twitter:description, twitter:image, twitter:site
- Live social share preview (title, description, image, domain)
- Hostname extraction from URL via `new URL`
- Copy output to clipboard

## Browser APIs Used

- Clipboard API (`navigator.clipboard.writeText`)
- URL API (`new URL` for hostname extraction)

## Code Structure

| File | Description |
|------|-------------|
| `og-generator.js` | `escAttr` (4 replacements), `addOgTag`/`addTwitterTag` conditional emitters, `updatePreview` (live card with `new URL` hostname, background-image), two-section output |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| `#oggTitle` | Page title |
| `#oggType` | OG type selector (website/article/etc.) |
| `#oggDesc` | Description |
| `#oggUrl` | Canonical URL |
| `#oggSiteName` | Site name |
| `#oggImage` | Image URL |
| `#oggLocale` | Locale (e.g. en_US) |
| `#oggTwitterCard` | Twitter card type |
| `#oggTwitterSite` | Twitter @username |
| `#oggGenerate` | Generate button |
| `#oggOutput` | Generated HTML tags |
| `#oggCopy` | Copy to clipboard |
| `#oggPreviewTitle`, `#oggPreviewDesc`, `#oggPreviewSite`, `#oggPreviewImage` | Live preview elements |

## License

MIT
