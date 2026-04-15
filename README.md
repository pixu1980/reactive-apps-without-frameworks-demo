# Reactive Apps Without Frameworks Demo

Standalone Todo demo extracted from the Reactive Apps Without Frameworks talk.

The app is intentionally framework free and ships only with Parcel as a build dependency.

## Scripts

```bash
pnpm install
pnpm start
pnpm build
```

## GitHub Pages

The workflow in [.github/workflows/static.yml](.github/workflows/static.yml) builds the app and publishes the `dist` folder to GitHub Pages.

GitHub Pages will publish the `.br` files, but it does not add `Content-Encoding: br` automatically. The sidecar files are useful for hosts or CDNs that support precompressed asset delivery.

Expected production URL:

```text
https://pixu1980.github.io/reactive-apps-without-frameworks-demo/
```

## Under the Hood Docs

Short walkthrough notes for the runtime live in `docs`.

- `implementation-journey.md` combines the whole story into one slide-friendly markdown file.
