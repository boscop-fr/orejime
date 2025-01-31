import migrateV3 from './v3/index';

declare global {
	interface Window {
		orejimeMigrateV2ToV3: typeof migrateV3;
	}
}

window.orejimeMigrateV2ToV3 = migrateV3;
