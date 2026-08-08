import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import type { ArticleMap as TArticleMap } from '../../utils/article-map/types';

const WIDTH = 800;
const HEIGHT = 600;
const PADDING = 40;

export default function ArticleMap({ articles }: { articles: TArticleMap[] }) {
	const ref = useRef<SVGSVGElement | null>(null);

	const [hoverArticle, setHoverArticle] = useState<TArticleMap | null>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		if (!ref.current) return;

		const svg = d3.select(ref.current);

		const xs = articles.map((article) => article.x);
		const ys = articles.map((article) => article.y);

		const xScale = d3
			.scaleLinear()
			.domain([Math.min(...xs), Math.max(...xs)])
			.range([PADDING, WIDTH - PADDING]);

		const yScale = d3
			.scaleLinear()
			.domain([Math.min(...ys), Math.max(...ys)])
			.range([HEIGHT - PADDING, PADDING]);

		// Glow filter
		svg
			.selectAll('defs')
			.data([null])
			.join('defs')
			.html(`
				<filter id="article-glow">
					<feGaussianBlur stdDeviation="3" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			`);

		// Article group
		const articlesGroup = svg
			.selectAll('.articles')
			.data([null])
			.join('g')
			.attr('class', 'articles');

		// Article stars
		const article = articlesGroup
			.selectAll('.article')
			.data(articles)
			.join('circle')
			.attr('class', 'article')
			.attr('cx', (article) => xScale(article.x))
			.attr('cy', (article) => yScale(article.y))
			.attr('r', 4)
			.attr('fill', 'white')
			.attr('filter', 'url(#article-glow)')
			.style('cursor', 'pointer')
			.on('mouseenter', (event, article) => {
				setHoverArticle(article);
				setPosition({
					x: event.offsetX,
					y: event.offsetY,
				});
			})
			.on('mousemove', (event) => {
				setPosition({
					x: event.offsetX,
					y: event.offsetY,
				});
			})
			.on('mouseleave', () => {
				setHoverArticle(null);
			})
			.on('click', (_, article) => {
				window.location.href = `/blog/${article.slug}`;
			});
	}, [articles]);

	return (
		<div className='relative overflow-hidden rounded-2xl bg-slate-900'>
			<svg
				ref={ref}
				width={WIDTH}
				height={HEIGHT}
				className='block'
				viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
			/>

			{hoverArticle && (
				<div
					style={{
						left: position.x + 10,
						top: position.y + 10,
					}}
					className='absolute rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur-md'
				>
					<a
						href={`/blog/${hoverArticle.slug}`}
						className='font-medium hover:underline'
					>
						{hoverArticle.title}
					</a>
				</div>
			)}
		</div>
	);
}
