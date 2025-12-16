// Checks that the given URL is a regular HTTP resource, and
// not malicious code (i.e. `javascript:...`).
export const isSafeUrl = (url) => {
	try {
		const parsed = new URL(url, window.location);
		return parsed.protocol === 'http:' || parsed.protocol === 'https:';
	} catch (e) {
		return false;
	}
};
