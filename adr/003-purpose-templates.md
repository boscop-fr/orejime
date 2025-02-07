---
date: 2025-02-08
status: Accepted
---

# Purpose templates

## Context

The current way of setting up third-party scripts is kind of confusing and requires shaky machanics to enable or disable them.
There might be a leaner way to handle this.

## Considerations

* Having to modify script attributes is tedious, and can be complicated within some environments.
* We're relying on hacky mechanics, namely the `type="orejime"` attribute. This makes the implementation in user land hard to explain.
* The current implementation relies on data attributes to "backup" actual attributes when disabling a script, and tag removal and reinsertion when enabling it. This leads to all sort of edge cases that are hard to pinpoint.
* The implementation varies depending on the HTML element that must be toggled (scripts are a special case).

## Decision

Instead of modifying elements, we'll wrap them inside `template` tags.
This way :
* The original script or element is left untouched.
* This is a native and straighforward functionality.
* One tag and attribute makes for less syntactic bloat than the previous prefix system.
* With the same amount of code, a single purpose can act on one or many HTML elements.
