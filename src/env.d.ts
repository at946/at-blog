/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly SITE_URI: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
