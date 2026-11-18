import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

export type ResponseText = {
	tags: string[];
};

const MODEL: string = 'gemini-3.6-flash';
const MAX_TAGS: number = 6;

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
});

export default async function (
	title: string,
	content: string,
): Promise<ResponseText> {
	const response = await ai.models.generateContent({
		model: MODEL,
		contents:
			'あなたは日本語ブログの記事を編集する編集者です。\n' +
			'\n' +
			`以下の記事を読み、タグを生成してください。\n` +
			'\n' +
			'## タグ\n' +
			`- 1~${MAX_TAGS}個のタグを生成する\n` +
			'- 記事中で単に言及されているだけの技術や概念はタグにしない\n' +
			'- 具体的すぎるタグは避ける\n' +
			'- 一般的すぎるタグは避ける\n' +
			'- タグは短く簡潔な日本語または一般的な英語にする\n' +
			'- 同じ意味のタグを複数つくらない\n' +
			'- 「ブログ」「記事」「その他」のような汎用的なタグは作らない\n' +
			'\n' +
			'タイトル:\n' +
			`${title}\n` +
			'\n' +
			'本文:\n' +
			`${content}`,
		config: {
			responseMimeType: 'application/json',
			responseJsonSchema: {
				type: 'object',
				properties: {
					tags: {
						type: 'array',
						minItems: 1,
						maxItems: MAX_TAGS,
						items: {
							type: 'string',
						},
					},
				},
				required: ['tags'],
			},
			temperature: 1.0,
		},
	});

	if (!response.text) {
		throw new Error('Gemini returned an empty response');
	}

	const result = JSON.parse(response.text) as ResponseText;

	return result;
}
