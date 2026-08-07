import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import type { ArticleMap as TArticleMap } from '../../utils/article-map/types';

const WIDTH = 800;
const HEIGHT = 600;
const PADDING = 40;

export default function ArticleMap({ articles }: { articles: TArticleMap[] }) {
	const ref = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (!ref.current) return;

		const svg = d3.select(ref.current);

		const xs = articles.map((a) => a.x);
		const ys = articles.map((a) => a.y);

		const xScale = d3
			.scaleLinear()
			.domain([Math.min(...xs), Math.max(...xs)])
			.range([PADDING, WIDTH - PADDING]);

		const yScale = d3
			.scaleLinear()
			.domain([Math.min(...ys), Math.max(...ys)])
			.range([HEIGHT - PADDING, PADDING]);

		svg
			.selectAll('circle')
			.data(articles)
			.join('circle')
			.attr('cx', (d) => xScale(d.x))
			.attr('cy', (d) => yScale(d.y))
			.attr('r', 5);
	}, [articles]);

	return <svg ref={ref} width={WIDTH} height={HEIGHT} />;
}
