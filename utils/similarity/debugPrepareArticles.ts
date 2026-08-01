import { prepareArticles } from './prepareArticles';

const main = async () => {
	const articles = await prepareArticles();
	console.log(articles.length);
	console.log(articles[0]);
};

main();
