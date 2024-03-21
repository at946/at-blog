import mermaid from 'mermaid';
import { useEffect } from 'react';

interface Props {
	content: string;
}

const Mermaid = ({ content }: Props) => {
	useEffect(() => {
		mermaid.initialize({ startOnLoad: true, theme: 'dark' });
	}, []);

	return (
		<div>
			<pre className='mermaid flex justify-center'>{content}</pre>
		</div>
	);
};

export default Mermaid;
