import CloseIcon from '@mui/icons-material/Close';
import { Modal, Typography, IconButton, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { updateSnippet } from '../../e-entities/snippet/model/repo.dexie';
import type { Snippet } from '../../f-shared/api/interfaces';

interface EditorModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	snippet: Snippet;
}

export const EditorModal = ({ open, setOpen, snippet: {name, id, code: value = ''} }: EditorModalProps) => {
	const [ saving, setSaving ] = useState(false);
	const [ code, setCode ] = useState(value);

	// обновляем содержимое при каждом открытии/смене id/value
	useEffect(() => {
		if (open) setCode(value ?? '');
	}, [open, id, value]);

	// ⌘/Ctrl+S
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
				e.preventDefault();
				handleSave();
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [open, code]);

	const handleSave = async () => {
		if (!code) return;
		try {
			setSaving(true);
			await updateSnippet(id, {code});
		} finally {
			setSaving(false);
			setOpen(false);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			disableAutoFocus
		>
			{/* слой центрирования */}
			<div className="flex items-center justify-center w-full h-full">
				{/* сама «карточка» модалки */}
				<div className="w-full max-w-[70vw] h-[85vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
					{/* header */}
					<div className="flex items-center justify-between px-3 py-2 border-b border-neutral-200">
						<Typography fontWeight={600}>{name}</Typography>
						<IconButton onClick={() => setOpen(false)} size="small">
							<CloseIcon />
						</IconButton>
					</div>

					{/* editor area — важен фиксированный размер */}
					<div className="flex-1 min-h-0">
						<Editor
							path={id} 
							defaultLanguage="javascript"
							height="100%"                // у родителя есть высота → редактор займет всё
							options={{
							minimap: { enabled: false },
							wordWrap: 'on',
							fontSize: 14,
							scrollBeyondLastLine: false,
							automaticLayout: true,
							}}
							value={code ?? ''}
							onChange={(v) => setCode(v ?? '')}
						/>
					</div>
					<div className="flex items-center justify-between gap-3 px-3 py-2 border-t border-neutral-200">
						{/* todo: after redesign fix fonts */}
						<span className="text-xs text-neutral-500">⌘/Ctrl+S to save</span>
						<Button onClick={handleSave} variant="contained" disabled={saving}>
							{saving ? 'Saving…' : 'Save'}
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	  )
}
