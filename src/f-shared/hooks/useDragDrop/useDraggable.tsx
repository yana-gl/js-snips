
import { renderToString } from 'react-dom/server';
import type { DraggableData } from '../../../e-entities/draggableData';
import { useRef, type RefObject } from 'react';
import { DragElementContent } from '../../components/dragElementContent/dragElementContent';

type UseDraggableData = {
    dragElementRef: RefObject<HTMLDivElement | null>;
    handleDragStart: (e: React.DragEvent, draggableData: DraggableData) => void;
};

export function useDraggable(): UseDraggableData {
    // требования к dragImage (изображение при перетаскивании), если это HTMLElement: existing, visible
    const dragElementRef = useRef<HTMLDivElement>(null);

    // Добавление передаваемых при перетаскивании данных
    const setDraggableData = (e: React.DragEvent, draggableData: DraggableData) => {
        const dataString = JSON.stringify(draggableData);
        e.dataTransfer?.setData('text/plain', dataString);
    };

    // Показать изображение при перетаскивании
    const showDragElement = (e: React.DragEvent, draggableData: DraggableData) => {
        const html = renderToString(
            <DragElementContent
                name={draggableData.name}
            />,
        );
        if (dragElementRef.current && e.dataTransfer) {
            dragElementRef.current.innerHTML = html;
            e.dataTransfer.setDragImage(dragElementRef.current, 0, 0);
        }
    };

    const handleDragStart = (e: React.DragEvent, draggableData: DraggableData) => {
        // removes green plus on drag over in os
        e.dataTransfer.effectAllowed = 'move';
        showDragElement(e, draggableData);
        setDraggableData(e, draggableData);
    };

    return { dragElementRef, handleDragStart };
}
