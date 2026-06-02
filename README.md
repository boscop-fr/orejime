# Orejime 🍪

> Let your users choose the cookies they eat on your website.

Orejime is a lightweight consent manager that focuses on accessibility.

[Explore its features](http://orejime.boscop.fr)

## Getting started

1.  [Installation](#installation)
1.  [Configuration](#configuration)
1.  [Third-party scripts configuration](#third-party-scripts-configuration)
1.  [Initialization](#initialization)

### Installation

Orejime comes with many styles and languages. It is distributed as individual
modules that follow a common convention, namely `orejime-[THEME]-[LANGUAGE]`.
For example:

- `orejime-standard-en.js` uses the standard theme with english texts
- `orejime-standard-fr.js` uses the standard theme with french texts
- `orejime-dsfr-fr.js` uses the DSFR theme with french texts

(Learn more about [themes](#theming) & [languages](#internationalization))

#### Content Delivery Network

The easiest way to use Orejime is to import a distribution via a CDN such as
jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/orejime@latest/dist/orejime-standard-en.js"></script>
<link
  href="https://cdn.jsdelivr.net/npm/orejime@latest/dist/orejime-standard.css"
  rel="stylesheet"
/>
```

> [!TIP] If you're using this method, please avoid using the `@latest` version.
> Prefer a fixed one like `https://cdn.jsdelivr.net/npm/orejime@3.0.0/…`. That
> way you can ensure you will not be impacted by a change of API or a potential
> bug that could land in the latest version.

#### npm

Orejime only distributes built files via npm
([learn why](./adr/001-distribution-formats.md)).

```sh
npm install orejime
```

You'll find the required JS and CSS files in the `dist` folder.

### Configuration

You need to pass Orejime some configuration for it to function. This is
typically done by assigning configuration options to `window.orejimeConfig`:

```html
<script>
  window.orejimeConfig = {
    // options
  };
</script>
```

You'll find all the available configuration options below.

> [!NOTE] Very few of the following options are actually required (only
> `purposes` and `privacyPolicyUrl` are). Optional options are explicitly
> flagged as such.

<details>

<summary>Annotated example of configuration</summary>

```js
var orejimeConfig = {
  // You must provide a link to your privacy policy page for GDPR compliance.
  privacyPolicyUrl: '',

  // [optional]
  // Opens the privacy policy link in a new window (target="_blank" and rel="noopener noreferrer").
  privacyPolicyNewWindow: false,

  // The list of third-party purposes that Orejime will manage for you.
  // The purposes will appear in the modal in the same order as defined here.
  purposes: [
    {
      // The id of the purpose, used internally by Orejime.
      id: 'google-tag-manager',

      // The title of the purpose as shown in the banner and modal.
      title: 'Google Tag Manager',

      // [optional]
      // The description of you purpose as listed in the modal.
      description: 'This is used for analytics.',

      // A list of regex expressions, strings, or arrays, giving the names of
      // cookies set by this purpose. If the user withdraws consent for a
      // given purpose, Orejime will then automatically delete all matching
      // cookies.
      //
      // See a different example below with the inline-tracker purpose
      // to see how to define cookies set on different path or domains.
      cookies: [
        '_ga',
        '_gat',
        '_gid',
        '__utma',
        '__utmb',
        '__utmc',
        '__utmt',
        '__utmz',
        '_gat_gtag_' + GTM_UA,
        '_gat_' + GTM_UA
      ],

      // [optional]
      // If "isMandatory" is set to true, Orejime will not allow this purpose to
      // be disabled by the user.
      // See "Special cases" below for more information.
      // (defaults to false)
      isMandatory: false,

      // [optional]
      // If `isExempt` is set to true, Orejime will load this purpose
      // even before the user gave explicit consent.
      // We recommend always leaving this "false".
      // See "Special cases" below for more information.
      // (defaults to false)
      isExempt: false,

      // [optional]
      // If "default" is set to true, the purpose will be enabled by default
      // (defaults to false)
      default: false,

      // [optional]
      // If "runsOnce" is set to true, the purpose will only be executed
      // once regardless how often the user toggles it on and off.
      // (defaults to false)
      runsOnce: true
    },
    {
      id: 'inline-tracker',
      title: 'Inline Tracker',
      description: 'Example of an inline tracking script',
      cookies: [
        'inline-tracker',
        // When deleting a cookie, Orejime will try to delete a cookie with the
        // given name, the "/" path, and multiple domains (the current domain
        // and `"." + current domain`).
        // If an app sets a cookie on a different path or domain than that,
        // Orejime won't be able to delete it by itself without more info.
        // In this case, you can explicitely define a cookie, a path and domain:
        ['cookieName', '/blog', '.' + location.hostname],
        ['cookieName', '/', 'test.mydomain.com']
      ]
    },
    {
      id: 'external-tracker',
      title: 'External Tracker',
      description: 'Example of an external tracking script',
      cookies: ['external-tracker'],
      isMandatory: true
    },

    // Purposes can also be grouped
    {
      id: 'advertising',
      title: 'Advertising',
      description: '…',
      purposes: [
        {
          id: 'foo',
          title: 'Foo',
          cookies: []
        },
        {
          id: 'bar',
          title: 'Bar',
          cookies: []
        }
      ]
    }
  ],

  // [optional]
  // If `forceModal` is set to true, Orejime will directly display
  // the consent modal and not allow the user to close it before having actively
  // consented or declined the use of third-party purposes.
  // (defaults to false)
  forceModal: false,

  // [optional]
  // If `forceBanner` is set to true, Orejime will display the consent
  // notice and not allow the user to close it before having actively consented
  // or declined the use of third-party purposes.
  // Has no effect if `forceModal` is set to true.
  // (defaults to false)
  forceBanner: false,

  // [optional]
  // You can overwrite existing translations and add translations for your
  // purpose descriptions and purposes. See `src/translations` for a full
  // list of translations that can be overwritten.
  translations: {
    modal: {
      description:
        'This is an example of how to override an existing translation already used by Orejime'
    }
  },

  // [optional]
  // You can pass an image url to show in the notice.
  // If the image is not exclusively decorative, you can pass an object
  // with the image `src` and `alt` attributes: `logo: {src: '...', alt: '...'}`
  logo: '/img/logo.png',

  // [optional]
  // You can customize the element that will contain Orejime (either
  // a selector or a DOM element).
  // It no element matches, an element will be created and inserted at the
  // beginning of the <body>.
  orejimeElement: '#orejime',

  // [optional]
  cookie: {
    // [optional]
    // You can customize the name of the cookie that Orejime uses for storing
    // user consent decisions.
    // (defaults to 'orejime')
    name: 'orejime',

    // [optional]
    // You can set a custom expiration time for the Orejime cookie, in days.
    // (defaults to 365.)
    duration: 365,

    // [optional]
    // You can provide a custom domain for the Orejime cookie, for example to make it available on every associated subdomains.
    domain: 'mydomain.com',

    // [optional]
    // Whether the cookie should be shared via cross-site requests.
    // @see https://web.dev/articles/samesite-cookies-explained
    sameSite: 'strict',

    // [optional]
    // You can provide a custom function to serialize the cookie contents.
    stringify: (contents) => JSON.stringify(contents),

    // [optional]
    // You can provide a custom function to unserialize the cookie contents.
    parse: (cookie) => JSON.parse(cookie)
  }
};
```

> [!IMPORTANT] If every purpose is either `isMandatory` or `isExempt`, Orejime
> will not show at startup (it will still be possible to open it
> programmatically). However, you should consider this use case carefully, and
> ensure that :
>
> - `isMandatory` trackers are truly required for your app to function properly
> - `isExempt` trackers are exempt from consent (i.e.
>   [as defined by the CNIL](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience))

</details>

### Third-party scripts configuration

Scripts that require user consent must not be executed when the page load.
Orejime will take care of loading them when the user has consented.

Those scripts must be tagged with their related purpose from the configuration.
This is done by wrapping them with a template tag and a `data-purpose`
attribute:

```diff
+ <template data-purpose="google-tag-manager">
    <script>
      (function(w,d,s,l,i){/* … */})(window,document,'script','dataLayer','GTM-XXXX')
    </script>
+ </template>
```

This way, the original script is left untouched, and any piece of HTML can be
controlled by Orejime in the same way.

You can wrap many elements at once or use several templates with the same
purpose:

```html
<template data-purpose="ads">
  <script src="https://annoying-ads.net"></script>
  <script src="https://intrusive-advertising.io"></script>
</template>

<template data-purpose="ads">
  <iframe src="https://streaming.ads-24-7.com/orejime"></iframe>
</template>
```

> [!NOTE] There is more you can do with templates! Learn about
> [contextual consent](#contextual-consent).

<details>
<summary>Integration tips</summary>

#### WordPress

Should you use Orejime in a WordPress website, you could alter the rendering of
the script tags it should handle:

```php
// Register a script somewhere…
wp_enqueue_script('matomo', 'matomo.js');

// …and change the script output to wrap it in a template.
function orejimeScriptLoader($tag, $handle, $src) {
    if ($handle === 'matomo') {
        return '<template data-purpose="analytics">' + $tag + '</template>';
    }

    return $tag;
}

add_filter('script_loader_tag', 'orejimeScriptLoader', 10, 3);

```

</details>

### Initialization

Now that you installed and configured Orejime, you should see it greet you!

Anytime the `window.orejimeConfig` variable is set with a valid configuration,
Orejime will pick it up and start.

In case you don't set this variable, Orejime can still be launched
programatically by passing it a configuration:

```js
Orejime.init(orejimeConfig);
```

> [!NOTE] Previously, Orejime could be imported as any other module and bundled
> into application code. With version 3, we're abandonning this functionality to
> provide standalone builds only
> ([learn why](./adr/001-distribution-formats.md)).

### Theming

#### Standard theme

This is a custom theme meant to be simple but elegant enough to be used as-is on
any website. It is easily customizable by tweaking some CSS properties.

You can either replace the original CSS entirely, or add your custom stylesheet
to overwrite only some of the rules.

```html
<link rel="stylesheet" href="orejime.css" />

<style>
  .orejime-Env {
    --orejime-font-family: monospace;
    --orejime-color-background: black;
    --orejime-color-text: yellow;
  }
</style>
```

You'll find the available CSS properties in
[the theme's stylesheet](src/ui/themes/standard/index.css).

#### DSFR theme

This theme is meant to be used on websites using the official design system of
the french government. As those sites already include the DSFR styles, this
theme does not provide any styles of its own but only makes use of the correct
markup and class names.

See the
[consent manager component](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/gestionnaire-de-consentement)
on the DSFR docs for an overview.

### Internationalization

Orejime is available in most european languages: Catalan, Dutch, English,
Estonian, Finnish, French, German, Hungarian, Italian, Norwegian, Occitan,
Romanian, Spanish, Swedish.

> [!NOTE] Each and every translated text is overridable via
> [the configuration](#configuration).

### Contextual consent

Content embedded from other websites might be restricted by user consent (i.e. a
YouTube video).

In that case, using templates would work just like with scripts:

```js
<template data-purpose="youtube">
  <iframe src="https://www.youtube.com/embed/toto"></iframe>
</template>
```

However, this won't show anything until the user consents to the related
purpose.

To be a little more user friendly, adding the `data-contextual` attribute will
display a fallback notice until consent is given, detailing the reason and
offering a way to consent in place.

```diff
- <template data-purpose="youtube">
+ <template data-purpose="youtube" data-contextual>
      <iframe src="https://www.youtube.com/embed/toto"></iframe>
  </template>
```

<details>
<summary>Integration tips</summary>

#### WordPress

Should you use Orejime in a WordPress website, you could alter the rendering of
embeds so they use contextual consent:

```php
function orejimeWrapEmbeds($content, $block) {
	if ($block['blockName'] === 'core/embed') {
		return '<template data-purpose="embeds" data-contextual>' . $content . '</template>';
	}

	return $content;
}

add_filter('render_block', 'orejimeWrapEmbeds', 10, 2);
```

</details>

## API

Functions and references are made available on the global scope:

- `loadOrejime(config)`: creates a new Orejime instance with the given config
  object

### Orejime instance

- `orejime.prompt()`: opens the consent modal
- `orejime.manager`: the core consent manager
- `orejime.config`: the complete config object used

### Manager

The manager handles the core functionality of Orejime.

- `orejime.manager.getConsent(purposeId)`: tells if the user has given consent
  to a given purpose
- `orejime.manager.setConsent(purposeId, consent)`: sets consent to a given
  purpose
- `orejime.manager.clearConsents()`: resets consents as if the user never
  interacted with Orejime (this will reopen the banner)
- `orejime.manager.acceptAll()`: gives consent to all purposes
- `orejime.manager.declineAll()`: revokes consent to all purposes

#### Events

The manager emits events to which you might subscribe to implement side effects:

```js
orejime.manager.on('update', function (updatedConsents, allConsents) {
  // Consent was granted or denied on some purposes.
  // `updatedConsents` is an object with purpose ids as
  // keys and consent state as values that holds only
  // updated purposes.
  // `allConsents` is similar to `updatedConsents` but
  // contains every purpose configured.
});

orejime.manager.on('clear', function () {
  // All consents have been reset to their default state.
  // This happens after a call to `orejime.manager.clearConsents()`.
});

orejime.manager.on('dirty', function (isDirty) {
  // If `isDirty` is true, the menager is in a state where
  // the consents given don't satisfy the constraints of
  // their related purposes (for example, a purpose with
  // the flag `isMandatory` requires explicit consent from
  // the user).
});
```

(See `src/core/Manager.ts` for a complete overview)

## Migrating

### Version 3

A major overhaul of the configuration took place in this version, as to clarify
naming and align more with the GDPR vocabulary.

#### Configuration

If you were already using version 2, a tool to migrate your current
configuration is available here : https://orejime.boscop.fr/#migration.

#### Third-party scripts

Previous versions of Orejime required you to alter third party script tags. This
behavior has changed, and you should now leave scripts untouched and wrap them
in a template, as documented in
[scripts configuration](#third-party-scripts-configuration)
([learn why](./adr/003-purpose-templates.md)).

As you can see from the following example, this is simpler and less intrusive:

```diff
- <script
-   type="opt-in"
-   data-type="application/javascript"
-   data-name="google-maps"
-   data-src="https://maps.googleapis.com/maps/api/js"
- ></script>
+ <template data-purpose="google-maps">
+   <script src="https://maps.googleapis.com/maps/api/js"></script>
+ </template>
```

## Development

If you want to contribute to Orejime, or make a custom build for yourself, clone
the project and run these commands:

```
npm install
npm run serve
```

You can then open the demo page at `http://localhost:3000`, which will be
reloaded automatically whenever the JS or CSS changes.

## License & credits

This project is licensed under a BSD-3 license.

Orejime started as a fork of [Klaro!](https://github.com/KIProtect/klaro). A lot
of stuff changed since. A few were integrated in the original project, but
eventually some big bricks changed and it became difficult, or sometimes not
even necessary, to push those changes in.

Orejime is maintained by [Boscop (French)](http://boscop.fr).

### What does "Orejime" mean?

"Orejime" is a play-on-word. You can pronounce it like "Au régime" in French,
which means "on a diet".

🍪🍪🍪
