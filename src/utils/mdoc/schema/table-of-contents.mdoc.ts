import { component } from '@astrojs/markdoc/config';

export const tableOfContents = {
	render: component('/src/components/mdoc/TableOfContents.astro'),
};
