import fs from 'fs';
import path from 'path';
import {rspack} from '@rspack/core';
import sharp from 'sharp';
import codeTheme from '../site/themes/boscop-light-soft-color-theme.json' with {type: 'json'};

const fullPath = path.resolve.bind(path, import.meta.dirname, '..');
const meta = {
	charset: 'utf-8',
	viewport: 'width=device-width, initial-scale=1'
};

// Finds and highlights code associated with a given feature.
const featureTemplateCode = async (name, lang) => {
	const ext = lang === 'javascript' ? 'js' : 'css';
	const path = fullPath(`site/features/${name}.${ext}`);

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
};

// Configures an HTML plugin to render an example page about
// a given feature.
// Those pages include snippets of JS and/or CSS to setup
// Orejime that are also presented to the user.
export const featureTemplatePlugin = ({
	title,
	feature,
	template = 'orejime',
	chunks = ['orejime'],
	lang = 'en'
}) => {
	return new rspack.HtmlRspackPlugin({
		chunks,
		minify: false,
		filename: `features/${feature}.html`,
		template: `site/features/${template}.html`,
		templateParameters: async () => ({
			lang,
			js: await featureTemplateCode(feature, 'javascript'),
			css: await featureTemplateCode(feature, 'css')
		}),
		// Oddly enough, the title tag needs to be filled in
		// the template so HtmlRspackPlugin can replace it.
		// If missing or left empty, the plugin injects an
		// empty title.
		title: `${title} - Orejime`,
		meta: {
			...meta,
			robots: 'noindex'
		}
	});
};

export const templatePlugin = ({
	title,
	template = 'index',
	chunks = [],
	params = {}
}) =>
	new rspack.HtmlRspackPlugin({
		meta,
		chunks,
		minify: false,
		filename: `${template}.html`,
		template: `site/${template}.html`,
		templateParameters: () => params,
		title: `${title} - Orejime`
	});

// Copies assets to the dist folder and optimizes images.
export const assetsPlugin = () =>
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
	});
