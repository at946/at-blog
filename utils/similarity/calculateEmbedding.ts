import { GoogleGenAI } from '@google/genai';
import type { Article, ArticleEmbedding } from './type';
import 'dotenv/config';

const EMBEDDING_MODEL = 'gemini-embedding-2';

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
});

const calculateEmbedding = async (
	article: Article,
): Promise<ArticleEmbedding> => {
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

export default calculateEmbedding;
