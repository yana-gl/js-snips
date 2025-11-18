import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import type { Folder, Snippet } from '../../f-shared/api/interfaces';
import { RenameModal } from '../renameModal/renameModal';
import { trashSnippet } from '../../e-entities/snippet/snippetStorage';
import { trashFolder } from '../../e-entities/folder/folderStorage';
import type { ContextMenuPosition } from '../../f-shared/types/contextMenuPosition';

type CardMenuProps = {
	type: 'SNIPPET' | 'FOLDER';
	entity: Folder | Snippet;
	contextMenuPosition: ContextMenuPosition | null;
	handleOpen: () => void;
	setContextMenuPosition: (ctx: ContextMenuPosition | null) => void;
};

export const CardMenu = ({ type, entity, contextMenuPosition, handleOpen, setContextMenuPosition }: CardMenuProps) => {
	const [ openRename, setOpenRename ] = useState(false);

	const handleRename = () => {
		setOpenRename(true);
		handleContextClose();
	};

	const handleDelete = () => {
		if (type === 'SNIPPET') {
			trashSnippet(entity.id);
		} else {
			trashFolder(entity.id);
		}
		handleContextClose();
	};


	const handleContextClose = () => {
		setContextMenuPosition(null);
	};

	return <>
		<Menu
			open={contextMenuPosition !== null}
  			onClose={handleContextClose}
			anchorReference="anchorPosition"
			anchorPosition={
				contextMenuPosition !== null
				? { top: contextMenuPosition.mouseY, left: contextMenuPosition.mouseX }
				: undefined
			}
		>
			<MenuItem onClick={handleOpen}>Открыть</MenuItem>
			<MenuItem onClick={handleRename}>Переименовать</MenuItem>
			<MenuItem onClick={handleDelete}>Удалить</MenuItem>
		</Menu>
		{	openRename &&
			<RenameModal
				open={openRename}
				setOpen={setOpenRename}
				type={type}
				entity={entity}
			/>
		}
	</>;
};
