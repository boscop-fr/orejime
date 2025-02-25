---
date: 2025-02-05
status: Accepted
---

# Distribution formats

## Context

Orejime can be consumed in different ways : via a CDN, by copying and hosting
the built assets, or by bundling it with client code. This sums up to two
categories : _standalone_ and _bundled_.

Those categories each impose different constraints to the Orejime's API, the way
it is built and distributed.

## Considerations

- When used as a standalone module, it does not need to wait for the whole
  client code to load with it so it can load faster.
- When used as a standalone module, it can be cached separately by the browser.
  It is likely that Orejime and the client code won't have the same rate of
  update, so Orejime could be cached for longer.
- Providing access to Orejime's source ties client code to it. The build system
  has to be able to handle it, and it imposes hard constraints on the
  technologies we use. For example, we are using a compatibility layer for React
  over Preact for the sole purpose of letting people use Orejime inside React
  projects. As we upgrade Orejime over time, we want to be able to change the
  whole underlying code (for performance, smaller footprint, ...) without
  breaking everyone's builds.
- We're working hard on optimizing every last bit of Orejime, and it has to do
  with the technologies we choose, the build pipeline, the way the app is split
  into small modules, and so on. Sadly, this can all be lost when the app is
  build another way.

## Decision

Given the previous reasons, letting one build Orejime themselves might be a
burden on them and on us, for no added value.

We will discontinue the distribution of ESM and CJS modules, as to prevent this
use entirely.

One could still import Orejime from source to bundle it themselves, but it would
now be their own responsibility to maintain it, as we couldn't guarantee not to
introduce breaking changes.
