/** @jsxRuntime automatic */
/** @jsxImportSource satori/jsx */

import fs from 'node:fs/promises';
import { loadDefaultJapaneseParser } from 'budoux';
import satori from 'satori';
import sharp from 'sharp';

type Props = {
	slug: string;
	title: string;
	tags: string[];
};

const OG_IMAGE_DIR: string = 'public/og-images/';

export default async function generateOgp({
	slug,
	title,
	tags,
}: Props): Promise<void> {
	const mediumFont = await fs.readFile(
		'src/assets/fonts/ZenMaruGothic-Medium.ttf',
	);
	const boldFont = await fs.readFile('src/assets/fonts/ZenMaruGothic-Bold.ttf');

	const parser = loadDefaultJapaneseParser();

	const element = {
		type: 'div',
		props: {
			style: {
				width: '1200px',
				height: '630px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#1e293b',
				color: '#4ade80',
				padding: '2rem',
			},
			children: [
				{
					type: 'div',
					props: {
						style: {
							fontSize: '1.5rem',
							fontWeight: 500,
							marginBottom: '2rem',
							color: 'white',
						},
						children: '- at-blog -',
					},
				},
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'center',
							fontSize: '3rem',
							fontWeight: 700,
							lineHeight: 1.4,
						},
						children: parser.parse(title).map((phrase) => ({
							type: 'span',
							props: {
								children: phrase,
							},
						})),
					},
				},
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							flexWrap: 'wrap',
							gap: '1rem',
							fontSize: '1.25rem',
							fontWeight: 500,
							marginTop: '2rem',
							color: 'white',
						},
						children: tags.map((tag) => ({
							type: 'span',
							props: {
								children: `#${tag}`,
							},
						})),
					},
				},
			],
		},
	};
	const svg = await satori(
		<div
			style={{
				width: '1200px',
				height: '630px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#1e293b',
				color: '#4ade80',
				padding: '2rem',
			}}
		>
			<div
				style={{
					fontSize: '1.5rem',
					fontWeight: 500,
					marginBottom: '2rem',
					color: 'white',
				}}
			>
				- at-blog -
			</div>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					fontSize: '3rem',
					fontWeight: 700,
					lineHeight: 1.4,
				}}
			>
				{parser.parse(title).map((phrase) => (
					<span key={phrase}>{phrase}</span>
				))}
			</div>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '1rem',
					fontSize: '1.25rem',
					fontWeight: 500,
					marginTop: '2rem',
					color: 'white',
				}}
			>
				{tags.map((tag) => (
					<span key={tag}>{`#${tag}`}</span>
				))}
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Zen Maru Gothic',
					data: mediumFont,
					weight: 500,
					style: 'normal',
				},
				{
					name: 'Zen Maru Gothic',
					data: boldFont,
					weight: 700,
					style: 'normal',
				},
			],
		},
	);

	await sharp(Buffer.from(svg)).png().toFile(`${OG_IMAGE_DIR}/${slug}.png`);
}
