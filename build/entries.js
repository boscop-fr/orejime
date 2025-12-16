const fs = require('fs');
const path = require('path');

const fullPath = path.resolve.bind(path, __dirname, '..');

// Generates a custom entry by inlining a small bootstrap
// script.
const standaloneEntry = (theme, lang) =>
	'data:text/javascript,'
	+ `import theme from '${fullPath(`src/ui/themes/${theme}/index.ts`)}';`
	+ `import translations from '${fullPath(`src/translations/${lang}.ts`)}';`
	+ `import {setupUmd} from '${fullPath('src/umd.ts')}';`
	+ 'setupUmd(theme, translations);';

// Generates entries for each possible combination of theme
// and language.
// @see ./adr/002-standalone-bundles.md
const standaloneEntries = () => {
	const themes = fs.readdirSync(fullPath('src/ui/themes'));
	const langs = fs
		.readdirSync(fullPath('src/translations'))
		.map((file) => path.basename(file, '.ts'));

	const entries = {};

	for (const theme of themes) {
		for (const lang of langs) {
			entries[`orejime-${theme}-${lang}`] = standaloneEntry(theme, lang);
		}
	}

	return entries;
};

module.exports = {
	standaloneEntries
};
