import type { DraggableData } from '../types/draggableData';
import { moveFolder } from '../../e-entities/folder/folderStorage';
import { moveSnippet } from '../../e-entities/snippet/snippetStorage';

export const handleDrop = (e: DragEvent, targetFolderId: string | null, draggable?: DraggableData) => {
    e.preventDefault();
    if (!draggable) return;
    const { id, type, currentParentId } = draggable;
    // если пытаемся перетащить в себя или в своего родителя
    if (id === targetFolderId || currentParentId === targetFolderId) {
       return;
    }
    if (type === 'SNIPPET') {
        moveSnippet(id, targetFolderId);
    } else {
        moveFolder(id, targetFolderId);
    }
};
