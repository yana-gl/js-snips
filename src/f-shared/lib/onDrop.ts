import type { DraggableData } from "../../e-entities/draggableData";
import { moveFolder } from "../../e-entities/folder/model/repo.dexie";
import { moveSnippet } from "../../e-entities/snippet/model/repo.dexie";

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
