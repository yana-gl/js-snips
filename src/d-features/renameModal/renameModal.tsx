import CloseIcon from '@mui/icons-material/Close';
import { Modal, Typography, IconButton, Button, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { createSnippet, updateSnippet } from '../../e-entities/snippet/model/repo.dexie';
import type { Folder, Snippet } from '../../f-shared/api/interfaces';
import { createFolder, updateFolder } from '../../e-entities/folder/model/repo.dexie';

interface RenameModalProps {
	type: 'SNIPPET' | 'FOLDER';
	open: boolean;
	setOpen: (open: boolean) => void;
	entity?: Snippet | Folder;
	parentId: string | null;
}

export const RenameModal = ({ type, open, setOpen, entity, parentId }: RenameModalProps) => {
	const [ saving, setSaving ] = useState(false);
	const [ name, setName ] = useState(entity?.name);

	// обновляем содержимое при каждом открытии/смене id/value
	useEffect(() => {
		if (open) setName(entity?.name ?? '');
	}, [open, entity]);

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
	}, [open, name]);

	const handleSave = async () => {
		if (!name) return;
		try {
			setSaving(true);
			if (type === 'SNIPPET') {
				if (!entity) {
					await createSnippet({ name, parentId, language: 'ts' });
				} else {
					await updateSnippet(entity.id, {name});
				}
			} else {
				if (!entity) {
					await createFolder(name, parentId);
				} else {
					await updateFolder(entity.id, {name});
				}
			}
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
				<div className="w-full max-w-[50vw] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
					{/* header */}
					<div className="flex items-center justify-between px-3 py-2 border-b border-neutral-200">
						<Typography fontWeight={600}>Enter name</Typography>
						<IconButton onClick={() => setOpen(false)} size="small">
							<CloseIcon />
						</IconButton>
					</div>
					<Input className="px-3 py-2" value={name} onChange={e => setName(e.target.value)}/>
					<div className="flex items-center justify-between gap-3 px-3 py-2 border-t border-neutral-200">
						{/* todo: after redesign fix fonts */}
						<span className="text-xs text-neutral-500">⌘/Ctrl+S to save</span>
						<Button onClick={handleSave} variant="contained" disabled={saving || !name}>
							{saving ? 'Saving…' : 'Save'}
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	  )
}
