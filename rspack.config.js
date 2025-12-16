const path = require('path');
const {rspack} = require('@rspack/core');
const services = require('./site/services.json');
const package = require('./package.json');
const {standaloneEntries} = require('./build/entries');
const {
	templatePlugin,
	featureTemplatePlugin,
	assetsPlugin,
	matomoPlugin
} = require('./build/site');

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
		'orejime-gtm': './src/gtm/index.ts',
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
						env: {
							// @see https://github.com/swc-project/swc-loader/issues/37#issuecomment-1233829398
							targets: package.browserslist
						},
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
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['postcss-preset-env']
							}
						}
					}
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
		templatePlugin({
			title: 'A lightweight and accessible consent manager',
			chunks: ['migrations'],
			params: {
				services
			}
		}),
		templatePlugin({
			title: 'Legal information & privacy policy',
			template: 'legal'
		}),
		templatePlugin({
			title: 'Accessibility statement',
			template: 'accessibility'
		}),
		featureTemplatePlugin({title: 'Purposes', feature: 'purposes'}),
		featureTemplatePlugin({title: 'Grouping', feature: 'grouping'}),
		featureTemplatePlugin({
			title: 'Internationalization',
			feature: 'i18n',
			lang: 'fr'
		}),
		featureTemplatePlugin({title: 'Styling', feature: 'styling'}),
		featureTemplatePlugin({
			title: 'Contextual consent',
			feature: 'contextual',
			template: 'contextual'
		}),
		featureTemplatePlugin({
			title: "Intégration au système de design de l'état",
			feature: 'dsfr',
			template: 'dsfr',
			chunks: [],
			lang: 'fr'
		}),
		featureTemplatePlugin({
			title: 'WCAG compliance',
			feature: 'wcag',
			template: 'wcag'
		}),
		assetsPlugin(),
		matomoPlugin()
	]
};
