import clsx from 'clsx';
import { useState } from 'react';

interface Props {
	copyText: string;
	children: React.ReactNode;
}

const CopyToClipboard = ({ copyText, children }: Props) => {
	const [tooltipIsOpen, setTooltipIsOpen] = useState<boolean>(false);

	const copyToClipboard = (): void => {
		navigator.clipboard.writeText(copyText);
		setTooltipIsOpen(true);
		setTimeout(() => {
			setTooltipIsOpen(false);
		}, 2000);
	};

	return (
		<div>
			<div className='relative flex justify-center'>
				<button
					type='button'
					title='クリップボードにコピー'
					onClick={copyToClipboard}
				>
					{children}
				</button>
				<span
					aria-hidden={!tooltipIsOpen}
					className={clsx(
						'absolute -top-10 rounded-sm bg-green-600 p-2 text-xs text-white transition-all',
						tooltipIsOpen ? 'scale-100' : 'scale-0',
					)}
				>
					<span>Copied</span>
				</span>
			</div>
		</div>
	);
};

export default CopyToClipboard;
