---
date: 2026-03-16
status: Accepted
---

# Modal dialogs implementation

## Context

We're using [micromodal](https://micromodal.vercel.app/) to manage modal
dialogs. This adds a dependency, thus increasing to the bundle size.

## Considerations

- we're using about half of the actual code of the module, which is made to
  handle multiple modals, discover them on load, etc.
- We have control over the contents of the various modals we're displaying, we
  don't need to handle various edge cases.

## Decision

We're removing micromodal and switching to a custom implementation.
