import { GoogleGenAI } from '@google/genai';
import { env } from './env';

const EMBEDDING_MODEL = 'gemini-embedding-2';

const ai = new GoogleGenAI({
	apiKey: env.geminiApiKey,
});

async function main() {
	const response = await ai.models.embedContent({
		model: EMBEDDING_MODEL,
		contents: 'Planning Poker is a technique for estimating work.',
		config: {
			outputDimensionality: 768,
		},
	});

	console.log(response.embeddings?.[0].values?.length);
}

main();
