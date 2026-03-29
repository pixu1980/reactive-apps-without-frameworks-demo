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

To render the compact iframe friendly variant, append `?embed=1`.

## Embed From The Talk Repo

The talk deck can override the iframe source with a `demo-url` query parameter.

Example:

```text
https://pixu1980.github.io/reactive-apps-without-frameworks/?demo-url=https%3A%2F%2Fpixu1980.github.io%2Freactive-apps-without-frameworks-demo%2F
```
