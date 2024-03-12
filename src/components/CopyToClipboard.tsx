import { useState } from 'react';
import { Tooltip } from 'react-tooltip';

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
		<span>
			<button
				type='button'
				onClick={copyToClipboard}
				title='クリップボードにコピー'
				data-tooltip-id='copy-to-clipboard-tooltip'
				data-tooltip-content='Copied'
			>
				{children}
			</button>
			<Tooltip id='copy-to-clipboard-tooltip' isOpen={tooltipIsOpen} />
		</span>
	);
};

export default CopyToClipboard;
