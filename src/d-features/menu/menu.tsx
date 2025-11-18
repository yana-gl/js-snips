/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import type { Folder, Snippet } from '../../f-shared/api/interfaces';
import { RenameModal } from '../renameModal/renameModal';
import { trashSnippet } from '../../e-entities/snippet/model/repo.dexie';
import { trashFolder } from '../../e-entities/folder/model/repo.dexie';

type FolderCardProps = {
	type: 'SNIPPET' | 'FOLDER';
	entity: Folder | Snippet;
	contextPos: any;
	handleOpen: () => void;
	setContextPos: (ctx: any) => void;
};

export const CardMenu = ({ type,  entity, contextPos, handleOpen, setContextPos }: FolderCardProps) => {
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
		setContextPos(null);
	};

	return <>
		<Menu
			open={contextPos !== null}
  			onClose={handleContextClose}
			anchorReference="anchorPosition"
			anchorPosition={
				contextPos !== null
				? { top: contextPos.mouseY, left: contextPos.mouseX }
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
	</>
}
