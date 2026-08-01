const requireEnv = (name: string): string => {
	const value = process.env[name];

	if (!value) {
		throw new Error(`${name} is not set`);
	}

	return value;
};

export const env = {
	geminiApiKey: requireEnv('GEMINI_API_KEY'),
};
