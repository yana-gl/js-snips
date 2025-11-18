import { useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorModal } from '../../d-features/editorModal/editorModal';
import type { Folder, Snippet } from '../../f-shared/api/interfaces';
import snippetIcon from '../../f-shared/assets/file.png';
import folderIcon from '../../f-shared/assets/folder.png';
import { CardMenu } from '../../d-features/menu/menu';
import { Tooltip } from '@mui/material';
import { handleDrop } from '../../f-shared/utils/onDrop';
import { useDragDropContext } from '../../f-shared/context/dragDropContext';
import clsx from 'clsx';
import type { DraggableData } from '../../f-shared/types/draggableData';
import { useDropArea } from '../../f-shared/hooks/useDropArea';
import type { ContextMenuPosition } from '../../f-shared/types/contextMenuPosition';

type SnippetCardProps = {
	type: 'SNIPPET';
	entity: Snippet;
};

type FolderCardProps = {
	type: 'FOLDER';
	entity: Folder;
};

type CardProps = SnippetCardProps | FolderCardProps;

export const Card = ({ type, entity }: CardProps) => {
	const isSnippet = type === 'SNIPPET';
	const navigate = useNavigate();
	const [ open, setOpen ] = useState(false);

	const iconSrc = isSnippet ? snippetIcon : folderIcon;
  	const iconAlt = isSnippet ? 'snippet icon' : 'folder icon';
	const { handleDragStart } = useDragDropContext();

	const onDrop = (e: DragEvent, data?: DraggableData) => handleDrop(e, entity.id, data);
    const [dropAreaRef, isDropActive] = useDropArea({
		onDrop: !isSnippet ? onDrop : undefined,
	});

	const handleOpen = () => isSnippet
		? setOpen(true)
		: navigate(`/folder/${entity.id}`);

	const [contextMenuPosition, setContextMenuPosition] = useState<ContextMenuPosition | null>(null);

	const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setContextMenuPosition(
			contextMenuPosition === null
			? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
			: null
		);
	};

	return <>
		<div
			className={clsx(
				'flex flex-col items-center gap-2 px-2 py-1 cursor-pointer w-[100px] overflow-hidden border-2 rounded-2xl',
				{
					'border-[var(--blue-grid-color)] border-dashed bg-[var(--bg-color)]/60': isDropActive && !isSnippet,
					'border-transparent': !isDropActive || isSnippet,
				}
			)}
			onDoubleClick={handleOpen}
			onContextMenu={handleContextMenu}
			ref={isSnippet ? null : dropAreaRef}
			onDragStart={e => handleDragStart(e, { id: entity.id, name: entity.name, type, currentParentId: entity.parentId })}
            draggable={true}
		>
			<img
				src={iconSrc}
				alt={iconAlt}
				className="w-[50px] h-[50px] object-contain"
			/>
			<Tooltip title={entity.name} placement="top">
				<div className='truncate w-full min-w-0 text-center'>{entity.name}</div>
			</Tooltip>
		</div>
		{/* Меню действий по карточке */}
		<CardMenu
			type={type}
			entity={entity}
			contextMenuPosition={contextMenuPosition}	
			handleOpen={handleOpen}
			setContextMenuPosition={setContextMenuPosition}
		/>
		{
			isSnippet &&
			<EditorModal
				open={open}
				setOpen={setOpen}
				snippet={entity}
			/>
		}
	</>;
};
