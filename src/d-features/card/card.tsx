import CodeIcon from '@mui/icons-material/Code';
import FolderIcon from '@mui/icons-material/Folder';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorModal } from '../editorModal/editorModal';
import type { Folder, Snippet } from '../../f-shared/api/interfaces';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type SnippetCardProps = {
  type: 'SNIPPET';
  entity: Snippet;
};

type FolderCardProps = {
  type: 'FOLDER';
  entity: Folder;
};

type CardProps = SnippetCardProps | FolderCardProps;

export const Card = ({ type,  entity }: CardProps) => {
	const navigate = useNavigate();
	const [ open, setOpen ] = useState(false);
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const menuOpen = Boolean(menuAnchorEl);

	const handleOpen = () => type === 'SNIPPET'
		? setOpen(true)
		: navigate(`/folder/${entity.id}`);

	const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
		// чтобы клик по трём точкам не триггерил двойной клик по карточке
		event.stopPropagation();
		setMenuAnchorEl(event.currentTarget);
  	};

	const handleMenuClose = () => {
		setMenuAnchorEl(null);
	};

	const handleRename = () => {
		console.log('rename', entity);
		handleMenuClose();
	};

	const handleDelete = () => {
		console.log('delete', entity);
		handleMenuClose();
	};

	return <>
		<div
			className="relative flex flex-col items-center gap-2 px-2 py-1 shadow-md rounded-xl cursor-pointer w-[100px] overflow-hidden"
			onDoubleClick={handleOpen}
		>
			{/* Кнопка с тремя точками в правом верхнем углу */}
			<div className="absolute right-1 top-1">
				<IconButton
					size="small"
					onClick={handleMenuOpen}
				>
					<MoreVertIcon fontSize="small"/>
				</IconButton>
			</div>
			
			{type === 'SNIPPET'
				? <CodeIcon className="w-[50px] h-[50px]"/>
				: <FolderIcon className="w-[50px] h-[50px]"/>}
			<Tooltip title={entity.name} placement="top">
				<div className='truncate w-full min-w-0 text-center'>{entity.name}</div>
			</Tooltip>
		</div>
		{/* Меню действий по карточке */}
		<Menu
			anchorEl={menuAnchorEl}
			open={menuOpen}
			onClose={handleMenuClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			<MenuItem onClick={handleOpen}>Открыть</MenuItem>
			<MenuItem onClick={handleRename}>Переименовать</MenuItem>
			<MenuItem onClick={handleDelete}>Удалить</MenuItem>
		</Menu>
		{
			type === 'SNIPPET' &&
			<EditorModal
				open={open}
				setOpen={setOpen}
				snippet={entity}
			/>
		}
	</>
}
