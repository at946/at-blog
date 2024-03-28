const extractSentenceFromMarkdocBody = (body: string): string => {
	return body
		.replace(/#{1,6} /g, '')
		.replace(/\*{1,3}/g, '')
		.replace(/!\[.*\]\(.*\)/g, '')
		.replace(/\[(.*)\]\(.*\)/g, '$1')
		.replace(/---/g, '')
		.replace(/<!-- .*? -->/g, '')
		.replace(/\n/g, ' ')
		.replace(/{%.*?\/%}/g, '')
		.replace(/```.*?```/g, '')
		.replace('`', '')
		.replace(/ +/g, ' ');
};

export default extractSentenceFromMarkdocBody;
