import mermaid, { type MermaidConfig } from 'mermaid';
import { useEffect } from 'react';

interface Props {
	content: string;
}

const config: MermaidConfig = {
	startOnLoad: true,
	theme: 'dark',
	gantt: {
		useMaxWidth: true,
	},
};

const Mermaid = ({ content }: Props) => {
	const isGantt = content.trim().startsWith('gantt');

	useEffect(() => {
		mermaid.initialize(config);
		mermaid.contentLoaded();
	}, []);

	return (
		<div className='flex justify-center w-full my-8'>
			<div
				className={`mermaid w-full overflow-x-auto [&>svg]:mx-auto ${
					isGantt ? '[&>svg]:min-w-[min(100%,600px)]' : ''
				}`}
			>
				{content}
			</div>
		</div>
	);
};

export default Mermaid;
