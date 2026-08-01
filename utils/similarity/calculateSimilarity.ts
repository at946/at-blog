const calculateDotProduct = (a: number[], b: number[]): number => {
	return a.reduce((sum, value, index) => sum + value * b[index], 0);
};

const calculateMagnitude = (a: number[]): number => {
	return a.reduce((sum, value) => sum + value ** 2, 0);
};

const calculateCosineSimilarity = (a: number[], b: number[]): number => {
	return (
		calculateDotProduct(a, b) / (calculateMagnitude(a) * calculateMagnitude(b))
	);
};

export default calculateCosineSimilarity;
