const estimateRaedingTime = (numberOfCharactors: number): number => {
	const readableNumberOfCharactersPerMinute: number = 600;
	const readingTime: number = Math.ceil(
		numberOfCharactors / readableNumberOfCharactersPerMinute,
	);
	return readingTime;
};

export default estimateRaedingTime;
