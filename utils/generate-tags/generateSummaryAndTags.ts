import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

export type ResponseText = {
	tags: string[];
	summary: string[];
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
			`以下の記事を読み、タグと「3行まとめ」を生成してください。\n` +
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
			'## 3行まとめ\n' +
			'- ちょうど3行生成する\n' +
			'- この記事を読んでいない友達に「これ、こんな話なんだよ」と話すような自然な文章にする\n' +
			'- 単なる内容の要約ではなく、記事の面白さ・筆者の主張・特徴的な考え方が伝わるようにする\n' +
			'- 筆者の主張や感情を残す\n' +
			'- 本文に特徴的な言い回しがあれば積極的に使う\n' +
			'- 本文にない情報や主張を追加しない\n' +
			'- 「この記事では〜」「〜について解説します」のようなAIっぽい表現は避ける\n' +
			'- 本文のトーンや言葉遣いに合わせる\n' +
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
					summary: {
						type: 'array',
						minItems: 3,
						maxItems: 3,
						items: {
							type: 'string',
						},
					},
				},
				required: ['tags', 'summary'],
			},
			temperature: 0.4,
		},
	});

	if (!response.text) {
		throw new Error('Gemini returned an empty response');
	}

	const result = JSON.parse(response.text) as ResponseText;

	return result;
}
