export type DraggableData = {
    id: string;
    type: 'SNIPPET' | 'FOLDER';
    name: string;
    currentParentId: string | null;
}
