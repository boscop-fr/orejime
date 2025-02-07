const fs = require('fs');
const path = require('path');
const {rspack} = require('@rspack/core');
const sharp = require('sharp');
const services = require('./site/services.json');
const codeTheme = require('./site/themes/boscop-light-soft-color-theme.json');

const fullPath = path.resolve.bind(path, __dirname);
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	mode: isDev ? 'development' : 'production',
	devtool: isDev ? 'eval-source-map' : false,
	devServer: {
		port: 3000,
		compress: true,
		static: {
			directory: fullPath('dist')
		}
	},
	entry: {
		migrations: './src/migrations/index.ts',
		...standaloneEntries()
	},
	output: {
		filename: '[name].js',
		path: fullPath('dist'),
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: fullPath('src'),
				type: 'javascript/auto',
				use: {
					loader: 'builtin:swc-loader',
					options: {
						jsc: {
							externalHelpers: true,
							preserveAllComments: false,
							parser: {
								syntax: 'typescript',
								tsx: true
							},
							transform: {
								react: {
									runtime: 'automatic',
									importSource: 'preact'
								}
							}
						}
					}
				}
			},
			{
				test: /\.css$/i,
				type: 'javascript/auto',
				use: [
					rspack.CssExtractRspackPlugin.loader,
					'css-loader',
				]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		fallback: {
			fs: false,
			// Avoids a warning from uneval.
			'internal-prop': false
		}
	},
	optimization: {
		// Prevents rspack from splitting anything more than
		// the explicit chunks created from dynamic imports.
		splitChunks: false
	},
	plugins: [
		new rspack.CssExtractRspackPlugin({
			filename: 'orejime-standard.css'
		}),
		new rspack.CopyRspackPlugin({
			patterns: [
				{
					from: 'site/assets',
					to: 'assets',
					async transform(content, from) {
						if (/(jpe?g|png|webp)$/i.test(from)) {
							return sharp(content)
								.resize({
									height: 48
								})
								.toBuffer();
						}

						return content;
					}
				}
			]
		}),
		new rspack.HtmlRspackPlugin({
			minify: false,
			template: 'site/index.html',
			templateParameters: () => ({
				services
			}),
			chunks: ['migrations']
		}),
		featureTemplatePlugin('Purposes', 'purposes'),
		featureTemplatePlugin('Grouping', 'grouping'),
		featureTemplatePlugin('Internationalization', 'i18n'),
		featureTemplatePlugin('Styling', 'styling'),
		featureTemplatePlugin(
			"Intégration au système de design de l'état",
			'dsfr',
			'dsfr',
			[]
		)
	]
};

// Generates entries for each possible combination of theme
// and language.
// @see ./adr/002-standalone-bundles.md
function standaloneEntries() {
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
}

function standaloneEntry(theme, lang) {
	return (
		'data:text/javascript,' +
		`import theme from '${fullPath(`./src/ui/themes/${theme}/index.ts`)}';` +
		`import translations from '${fullPath(
			`./src/translations/${lang}.ts`
		)}';` +
		`import {setupUmd} from '${fullPath('./src/umd.ts')}';` +
		'setupUmd(theme, translations);'
	);
}

// Configures an HTML plugin to render an example page about
// a given feature.
// Those pages include snippets of JS and/or CSS to setup
// Orejime that are also presented to the user.
function featureTemplatePlugin(
	title,
	name,
	template = 'orejime',
	chunks = ['orejime']
) {
	return new rspack.HtmlRspackPlugin({
		chunks,
		minify: false,
		filename: `features/${name}.html`,
		template: `site/features/${template}.html`,
		templateParameters: async () => ({
			js: await featureTemplateCode(name, 'javascript'),
			css: await featureTemplateCode(name, 'css')
		}),
		// Oddly enough, the title tag needs to be filled in
		// the template so HtmlRspackPlugin can replace it.
		// If missing or left empty, the plugin injects an
		// empty title.
		title: `${title} - Orejime`,
		meta: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			robots: 'noindex'
		}
	});
}

// Finds and highlights code associated with a given feature.
async function featureTemplateCode(name, lang) {
	const ext = lang === 'javascript' ? 'js' : 'css';
	const path = `./site/features/${name}.${ext}`;

	if (!fs.existsSync(path)) {
		return null;
	}

	const code = fs.readFileSync(path, 'utf-8');
	const {codeToHtml} = await import('shiki');
	const highlightedCode = await codeToHtml(code, {
		lang,
		theme: codeTheme
	});

	return {
		code,
		highlightedCode
	};
}
