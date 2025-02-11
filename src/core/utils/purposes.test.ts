import {deserializeConsents, serializeConsents} from './purposes';

test('serializeConsents', () => {
	expect(serializeConsents({})).toEqual('');
	expect(serializeConsents({a: true, b: false})).toEqual('a=1;b=0');
});

test('deserializeConsents', () => {
	expect(deserializeConsents('')).toEqual({});
	expect(deserializeConsents('a=1;b=0')).toEqual({a: true, b: false});
});
