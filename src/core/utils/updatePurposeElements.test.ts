import updatePurposeElements from './updatePurposeElements';

test('updatePurposeElements', () => {
	document.body.innerHTML = `
		<script id="foo" type="orejime" data-purpose="foo" data-src="src" crossorigin="anonymous"></script>
	`;

	updatePurposeElements('foo', false);
	const foo = document.getElementById('foo')!;

	expect(foo.getAttribute('type')).toEqual('orejime');
	expect(foo.hasAttribute('src')).toBeFalsy();
	expect(foo.hasAttribute('data-type')).toBeFalsy();
	expect(foo.getAttribute('data-src')).toEqual('src');
	expect(foo.getAttribute('crossorigin')).toEqual('anonymous');

	updatePurposeElements('foo', true);
	const foo2 = document.getElementById('foo')!;

	expect(foo2.hasAttribute('data-type')).toBeFalsy();
	expect(foo2.hasAttribute('data-src')).toBeFalsy();
	expect(foo2.getAttribute('type')).toEqual('text/javascript');
	expect(foo2.getAttribute('src')).toEqual('src');
	expect(foo2.getAttribute('crossorigin')).toEqual('anonymous');

	updatePurposeElements('foo', true);
	const foo3 = document.getElementById('foo')!;

	expect(foo3.hasAttribute('data-type')).toBeFalsy();
	expect(foo3.hasAttribute('data-src')).toBeFalsy();
	expect(foo3.getAttribute('type')).toEqual('text/javascript');
	expect(foo3.getAttribute('src')).toEqual('src');
	expect(foo3.getAttribute('crossorigin')).toEqual('anonymous');

	updatePurposeElements('foo', false);
	const foo4 = document.getElementById('foo')!;

	expect(foo4.getAttribute('type')).toEqual('orejime');
	expect(foo4.hasAttribute('src')).toBeFalsy();
	expect(foo4.getAttribute('data-type')).toEqual('text/javascript');
	expect(foo4.getAttribute('data-src')).toEqual('src');
	expect(foo4.getAttribute('crossorigin')).toEqual('anonymous');
});
