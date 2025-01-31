const fs = require('fs');
const path = require('path');
const {rspack} = require('@rspack/core');
const sharp = require('sharp');
const pkg = require('./package.json');
const services = require('./site/services.json');
const theme = require('./site/themes/boscop-light-soft-color-theme.json');

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
		orejime: ['./src/umd.ts', './src/styles/orejime.scss'],
		migrations: './src/migrations/index.ts'
	},
	output: {
		filename: '[name].js',
		chunkFilename: (pathData) => {
			// strips file names from generated chunk names
			return isDev
				? pathData.chunk.name
				: pathData.chunk.name.replace(/(\-ts|\-index\-ts)$/, '.js');
		},
		path: fullPath('dist'),
		publicPath: 'auto',
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
				test: /\.ya?ml$/,
				use: 'yaml-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				type: 'javascript/auto',
				use: [
					rspack.CssExtractRspackPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		fallback: {
			fs: false
		}
	},
	optimization: {
		// Prevents rspack from splitting anything more than
		// the explicit chunks created from dynamic imports.
		splitChunks: false
	},
	plugins: [
		new rspack.BannerPlugin({
			banner:
				pkg.name +
				' v' +
				pkg.version +
				' - ' +
				pkg.license +
				' license, ' +
				'original work Copyright (c) 2018 DPKit, ' +
				'modified work Copyright (c) 2019 Boscop, ' +
				'all rights reserved.'
		}),
		new rspack.CssExtractRspackPlugin({
			filename: 'orejime.css'
		}),
		new rspack.CopyRspackPlugin({
			patterns: [
				{
					from: 'src/styles'
				},
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
		theme
	});

	return {
		code,
		highlightedCode
	};
}
