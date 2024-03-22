import mermaid, { type MermaidConfig } from 'mermaid';
import { useEffect } from 'react';

interface Props {
	content: string;
}

const config: MermaidConfig = {
	startOnLoad: true,
	theme: 'dark',
};

const Mermaid = ({ content }: Props) => {
	mermaid.initialize(config);

	useEffect(() => {
		mermaid.contentLoaded();
	}, []);

	return (
		<div>
			<pre className='mermaid flex justify-center'>{content}</pre>
		</div>
	);
};

export default Mermaid;
