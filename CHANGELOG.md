# CHANGELOG

## 2.2.1

- fix: typo in Occitan translations (https://github.com/boscop-fr/orejime/pull/84)

## 2.2.0

- feature: Consent exemption (https://github.com/boscop-fr/orejime/pull/82)
- feature: Occitan translations (https://github.com/boscop-fr/orejime/pull/83)
- fix: cross-platform build scripts (https://github.com/boscop-fr/orejime/pull/77)

## 2.1.1

- fix: string formatting (https://github.com/boscop-fr/orejime/pull/71)
- internal: code formatting with prettier (https://github.com/boscop-fr/orejime/pull/69)

## 2.1.0

- feature: translation of category names and descriptions (https://github.com/boscop-fr/orejime/pull/67)

## 2.0.3

- fix: focus trap in consent modal (https://github.com/boscop-fr/orejime/pull/62)

## 2.0.2

- doc: Added doc on unpkg versions (https://github.com/boscop-fr/orejime/pull/61)
- fix: Updated default "powered by" URL (https://github.com/boscop-fr/orejime/pull/58)

## 2.0.1

- fix: acceptance of all cookies when clicking "accept", including ones that are off by default
- fix: broken toggle buttons

## 2.0.0

- fix: translation of app titles (https://github.com/boscop-fr/orejime/issues/42)
- fix: title of accept button (https://github.com/boscop-fr/orejime/issues/45)
- demo: redesign of the demo page (https://github.com/boscop-fr/orejime/pull/46)
- feature: cookie domain configuration (https://github.com/boscop-fr/pull/issues/38)
- feature: providing Sass variables for breakpoints (https://github.com/boscop-fr/pull/issues/36)
- feature: categories (https://github.com/boscop-fr/pull/issues/22)
- breaking change: removed implicit consent (https://github.com/boscop-fr/orejime/pull/50)

## 1.2.3

- fix: Allowing HTML in item descriptions (https://github.com/boscop-fr/orejime/issues/18)

## 1.2.2

- fix: import of nl translations (https://github.com/boscop-fr/orejime/pull/27)
- fix: hiding batch actions when all apps are required (https://github.com/boscop-fr/pull/issues/28)

## 1.2.1

- doc: capitalization of nationalities and languages (https://github.com/boscop-fr/orejime/issues/16)
- doc: improved example markup (attributes were missing from `<script />` tags)
- translations: updates to `nl` translations
- internal: node-sass update

## 1.2.0

- new feature: Ability to customize cookie serialization (https://github.com/boscop-fr/orejime/issues/13)

## 1.1.1

nothing different from 1.1.0, this is just to make npm bypass a problem...

## 1.1.0

- fix the UMD build, now the Orejime object is actually exported correctly and everything works according to the documentation (see https://github.com/boscop-fr/orejime/issues/7)
- fix the Orejime ES6/CommonJS module, now you can consume it as described in the documentation (see https://github.com/boscop-fr/orejime/issues/8), thanks @ambroisemaupate
- new feature: notice: add possibility to set the notice as mandatory via the "mustNotice" option, behaves like the "mustConsent" option
- new feature: notice: add possibility to define a title via translations
- new feature: notice: add possibility to show a logo via the "logo" config
- new feature: notice: add possibility to show a text with the privacy policy link via translations, like in the modal
- fix the possibility to deny required apps (see https://github.com/boscop-fr/orejime/issues/9), thanks @RomainTweaks
- fix modal "enable all" button: let the user click the button as soon as one app is not enabled
- behavior change: automatic loading of orejime by checking the presence of `window.orejimeConfig` now only works with the UMD build, not in a module context.
- added a debug mode you can activate via the config, for now only used for logging missing translations
- translations: don't show "missing translation" messages anymore, now show those messages in the console when debug mode is on

## 1.0.3

- add a few CSS rules to prevent collapsing with the website styles
- fix a couple JS errors on IE11 that occured after saving one time

## 1.0.2

- fix accessibility issue with Orejime not removing the app `aria-hidden="true"` at times
- replace default "powered by" url by the Orejime homepage

## 1.0.1

- add the version number in the built files
- tiny fix in modal text, remove a superfluous whitespace between description and privacy policy text

## Orejime 1.0.0

The project now has moved a lot from the original one. The way the lib can be consumed and the way the lib is authored are noticeably different from [Klaro!](https://github.com/KIProtect/klaro). **For these reasons, we decided to give our fork its own name: Orejime :cookie:.**

The main updates included in this version are:

- name change: all options with a default "klaro" value now have a default "orejime" value
- name change: README and demo have been totally revamped to match the changes between Klaro! and Orejime
- new feature: you can now configure Orejime to enable implicit consent via the `implicitConsent` config. Implicit consent means, if the user navigates on more than one page on your website, all the apps configured will be automatically accepted.
- new feature: if the user has saved his preferences and a new apps config is detected, the notice (or the modal, if `mustConsent` is set) should now appear again to let the user know of the changes.
- feature change: when toggling apps after the user already saved his preferences once: never save preference as soon as it is toggled (see https://github.com/KIProtect/klaro/issues/52).
- feature change: easier cookie deletion on app deactivation. When defining an app in your config file, now you shouldn't have to bother to describe the cookie domains anymore. Orejime should find them on its own (see https://github.com/KIProtect/klaro/issues/51).
- feature change: app toggle switchs: add a label below the switch to be 100% clear on the current state of the toggle
- feature change: the "toggle all" checkbox has been replaced by two distinct buttons, "enable all apps" and "disable all apps", for more clarity.
- feature change: if no element with the given *elementID* is in the DOM, it will now be inserted at the beginning of the body and not the end
- refactor: complete overhaul of the way the lib can be consumed. You can now consume Orejime via npm, with commonjs or es6 modules, in addition to the already existing umd build. More details in b868d7a.
- refactor: stop making a build with CSS included in the umd build. The css is now only available via its own css file.
- fix: better default CSS and JS behavior to prevent website scrolling when the modal is open.
- fix: support IE11 (assuming [some polyfills](https://polyfill.io/v2/docs/) are in the page)
- dev: use browser-sync as a dev server

## Klaro! fork 0.3.1

- "powered by" link: add "new window" title to warn user about the _blank target attribute
- a11y: when opening the consent modal via the "learn more" consent notice button, and exiting the consent modal via ESC or close button, the focus now correctly goes back to the "learn more" button
- fix: the small CSS reset was wrongly applied on the body when `mustContent = true`

## Klaro! fork 0.3.0

This version includes everything from the Klaro! original repo until commit [fce14a2](https://github.com/KIProtect/klaro/commits/fce14a280926da9ae474f7fee7333253ffc6430d).

This means, between original repo tag 0.2.1 and this version, the changes we made are:

- build: use only one webpack config, shared for all build environments *(merged in original repo)*
- build: new `make-watch` script to create a development build of klaro on disk everytime a file changes. Useful when using npm link *(merged in original repo)*
- npm config: you can easily publish the package on your own private npm repository if needed *(merged in original repo)*
- accessibility: klaro is now noticeably more accessible. Experience should be improved for sighted users, keyboard users, screen reader users *(soon to be merged)*
- :warning: new `appElement` config: for better accessibily, the lib must know what is the div wrapping your website
- build: when generating production build, generate two klaro files, one with and one without CSS
- :warning: CSS: reworked how CSS is authored as a whole. Now using BEM classes instead of ~generic classnames with heavy selectors
- apps list: do not show a "toggle all" switch if there is only one app listed
- consent notice: move the "learn more" button with other actions
