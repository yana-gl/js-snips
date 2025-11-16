/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorModal } from '../editorModal/editorModal';
import type { Folder, Snippet } from '../../f-shared/api/interfaces';
import snippetIcon from '../../f-shared/source/file.png';
import folderIcon from '../../f-shared/source/folder.png';
import { CardMenu } from '../menu/menu';
import { Tooltip } from '@mui/material';
import { useDropArea } from '../../f-shared/hooks/useDragDrop/useDropArea';
import type { DraggableData } from '../../e-entities/draggableData';
import { moveSnippet } from '../../e-entities/snippet/model/repo.dexie';
import { moveFolder } from '../../e-entities/folder/model/repo.dexie';

type SnippetCardProps = {
	type: 'SNIPPET';
	entity: Snippet;
	onDragStart: any;
};

type FolderCardProps = {
	type: 'FOLDER';
	entity: Folder;
	onDragStart: any;
};

type CardProps = SnippetCardProps | FolderCardProps;

export const Card = ({ type,  entity, onDragStart }: CardProps) => {
	const navigate = useNavigate();
	const [ open, setOpen ] = useState(false);
	const iconSrc = type === 'SNIPPET' ? snippetIcon : folderIcon;
  	const iconAlt = type === 'SNIPPET' ? 'Snippet' : 'Folder';
	const onDragOver = () => {
        console.log('on drag over');
    };

    const onDrop = (e: DragEvent, draggableData?: DraggableData) => {
		console.log(draggableData);

		// если пытаемся перетащить в сниппет или в себя или в своего родителя
        if (type === 'SNIPPET' || draggableData?.id === entity.id || draggableData?.currentParentId === entity.id) {
            e.preventDefault();
        } else if (draggableData) {
			if (draggableData.type === 'SNIPPET') {
				moveSnippet(draggableData.id, entity.id);
			} else {
				moveFolder(draggableData.id, entity.id);
			}
        }
    };

    const [ dropAreaRef ] = useDropArea({ onDragOver, onDrop });

	const handleOpen = () => type === 'SNIPPET'
		? setOpen(true)
		: navigate(`/folder/${entity.id}`);

	const [contextPos, setContextPos] = useState<{ mouseX: number; mouseY: number } | null>(null);

	const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setContextPos(
			contextPos === null
			? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
			: null
		);
	};

	return <>
		<div
			className="flex flex-col items-center gap-2 px-2 py-1 cursor-pointer w-[100px] overflow-hidden"
			onDoubleClick={handleOpen}
			onContextMenu={handleContextMenu}
			ref={dropAreaRef}
			onDragStart={e => onDragStart(e, { id: entity.id, name: entity.name, type, currentParentId: entity.parentId })}
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
			contextPos={contextPos}	
			handleOpen={handleOpen}
			setContextPos={setContextPos}
		/>
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
