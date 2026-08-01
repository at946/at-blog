import { GoogleGenAI } from '@google/genai';
import { env } from '../env';
import type { Article, Embedding } from './type';

const EMBEDDING_MODEL = 'gemini-embedding-2';

const ai = new GoogleGenAI({
	apiKey: env.geminiApiKey,
});

const generateEmbedding = async (article: Article): Promise<Embedding> => {
	const response = await ai.models.embedContent({
		model: EMBEDDING_MODEL,
		contents: article.content,
		config: {
			outputDimensionality: 768,
		},
	});

	const embedding = response.embeddings?.[0]?.values;

	if (!embedding) {
		throw new Error(`Failed to generate embedding: ${article.slug}`);
	}

	return {
		slug: article.slug,
		articleHash: article.articleHash,
		embedding: embedding,
	};
};

export default generateEmbedding;
