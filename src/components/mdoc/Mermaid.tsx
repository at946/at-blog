import mermaid, { type MermaidConfig } from 'mermaid';
import { useEffect, useState } from 'react';
import { theme } from '../../store/theme';

interface Props {
	content: string;
}

const Mermaid = ({ content }: Props) => {
	const [currTheme, setCurrTheme] = useState<'dark' | 'light'>('dark');
	const isGantt = content.trim().startsWith('gantt');

	useEffect(() => {
		const unsubscribe = theme.subscribe((val) => {
			setCurrTheme(val);
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const config: MermaidConfig = {
			startOnLoad: true,
			theme: currTheme === 'dark' ? 'dark' : 'forest',
			gantt: {
				useMaxWidth: true,
			},
		};
		mermaid.initialize(config);
		mermaid.run();
	}, [currTheme]);

	return (
		<div className='flex justify-center w-full my-8' key={currTheme}>
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
