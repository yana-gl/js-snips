import { Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { createSnippet, updateSnippet } from '../../e-entities/snippet/snippetStorage';
import type { Folder, Snippet } from '../../f-shared/api/interfaces';
import { createFolder, updateFolder } from '../../e-entities/folder/folderStorage';
import { useParams } from 'react-router-dom';
import { BaseModal } from '../../f-shared/ui/baseModal/baseModal';
import { SaveModalFooter } from '../../f-shared/ui/baseModal/saveModalFooter';
import { useSaveHotkey } from '../../f-shared/hooks/useHotKeys';

interface RenameModalProps {
	type: 'SNIPPET' | 'FOLDER';
	open: boolean;
	setOpen: (open: boolean) => void;
	entity?: Snippet | Folder;
}

export const RenameModal = ({ type, open, setOpen, entity }: RenameModalProps) => {
	const [ saving, setSaving ] = useState(false);
	const [ name, setName ] = useState(entity?.name);
	const { folderId } = useParams();
	const parentId = folderId ?? null;

	// обновляем содержимое при каждом открытии/смене id/value
	useEffect(() => {
		if (open) setName(entity?.name ?? '');
	}, [open, entity]);

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

	useSaveHotkey({ open, onSave: handleSave });

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<BaseModal
			open={open}
			setOpen={setOpen}
			modalTitle={'Enter name'}
			onClose={handleClose}
			footer={
				<SaveModalFooter
					saving={saving}
					disabled={saving || !name}
					onSave={handleSave}
				/>
			}
		>
			<Input autoFocus={true} className="px-3 py-2" value={name} onChange={e => setName(e.target.value)}/>
		</BaseModal>
	  );
};
