---
date: 2025-02-07
status: Accepted
---

# Standalone bundles

## Context

As of now, Orejime is split into many chunks to isolate the core from the
language and UI. However, it is often used on websites using a single language,
and always a single theme.

## Considerations

- Async loading relies on bundler magic to locate chunks.
- A bundle containing the core, lang and UI is more optimized than when split
  and loaded asynchronously, because resources are mutualized and compression
  acts on the whole bundle at once. Also, this save the time needed to import
  the chunks.
- Loading different versions of a bundle requires no more work than setting
  options in the config. In most cases, this will actually be easier.
- The split was meant to reduce network and preocessing usage by loading the
  bare minimum code. However, Orejime would pop anytime a user visits a website
  for the first time, and the UI would thus be loaded and cached. We might as
  well load and cache the whole bundle at once.
- Generating a bundle for each combination of themes and languages could lead to
  bloat, but we shouldn't add lots of themes. Anyways, even a large list of
  bundles wouldn't really be a problem, as long as each one is optimized.

## Decision

Orejime will now be distributed as many standalone packages, each providing a
single theme and language. For example, `orejime-dsfr-en` would provide orejime
with the DSFR theme and the english translations.
