# Reactive Apps Without Frameworks Demo

Standalone Todo demo extracted from the Reactive Apps Without Frameworks talk.

The app is intentionally framework free and ships only with Parcel as a build dependency.

## Scripts

```bash
pnpm install
pnpm start
pnpm run build
```

## GitHub Pages

The workflow in [.github/workflows/static.yml](.github/workflows/static.yml) builds the app and publishes the `dist` folder to GitHub Pages.

Expected production URL:

```text
https://pixu1980.github.io/reactive-apps-without-frameworks-demo/
```

## Talk Integration

The talk deck no longer embeds the app in an iframe. It links to this standalone demo in a new tab so the exact same experience can be explored outside the slides.
