import CloseIcon from '@mui/icons-material/Close';
import { Modal, Typography, IconButton } from '@mui/material';
import clsx from 'clsx';
import { type ReactNode } from 'react';

interface AppModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	onClose: () => void;
    modalTitle: string;
    children: ReactNode;
    footer: ReactNode;
	contentClassName?: string;
}

export const AppModal = ({ open, setOpen, modalTitle, children, footer, onClose, contentClassName }: AppModalProps) => {
	const baseContentClass ='w-full max-w-[60vw] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col';

	return (
		<Modal
			open={open}
			onClose={onClose}
			disableEscapeKeyDown={false}
		>
			{/* слой центрирования */}
			<div className="flex items-center justify-center w-full h-full">
				{/* сама «карточка» модалки */}
				<div className={clsx(baseContentClass, contentClassName)}>
					{/* header */}
					<div className="flex items-center justify-between px-3 py-2 border-b border-neutral-200">
						<Typography fontWeight={600}>{modalTitle}</Typography>
						<IconButton onClick={() => setOpen(false)} size="small">
							<CloseIcon />
						</IconButton>
					</div>
                    {/* content */}
					{children}
                    {footer}
				</div>
			</div>
		</Modal>
	  )
}
