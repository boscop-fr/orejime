import updatePurposeElements from './updatePurposeElements';

test('updatePurposeElements', () => {
	document.body.innerHTML = `
		<template data-purpose="foo">
			<script id="foo" src="src" crossorigin="anonymous"></script>
		</template>
	`;

	updatePurposeElements('foo', false);
	expect(document.getElementById('foo')).toBeNull();

	updatePurposeElements('foo', true);
	const foo2 = document.getElementById('foo')!;

	expect(foo2.getAttribute('id')).toEqual('foo');
	expect(foo2.getAttribute('src')).toEqual('src');
	expect(foo2.getAttribute('crossorigin')).toEqual('anonymous');

	updatePurposeElements('foo', true);
	updatePurposeElements('foo', true);
	expect(document.querySelectorAll('script')).toHaveLength(1);

	updatePurposeElements('foo', false);
	expect(document.getElementById('foo')).toBeNull();
});
