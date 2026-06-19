// Turns a pattern into a regex.
// If the string looks like a regex pattern, it is used as-is.
// Otherwise, a regex is build to match the string exactly.
export const toRegex = (pattern: string | RegExp) => {
	if (pattern instanceof RegExp) {
		return pattern;
	}

	if (pattern.startsWith('/')) {
		// A regex to match a (simplistic) regex to match cookie names.
		// `i` is the only relevant flag in that context.
		const matches = /^\/(.*)\/(i?)$/.exec(pattern);

		if (matches) {
			try {
				return new RegExp(matches[1], matches[2]);
			} catch (e) {}
		}
	}

	const escaped = pattern.replace(
		/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
		'\\$&'
	);

	return new RegExp(`^${escaped}$`);
};
