import { useEffect, useRef } from 'react';
import type { DraggableData } from '../../../e-entities/draggableData';

interface DropAreaProps {
    onDragOver?: (e: DragEvent) => void;
    onDragLeave?: (e: DragEvent) => void;
    onDrop?: (e: DragEvent, draggableData?: DraggableData) => void;
}

export const useDropArea = ({ onDragOver, onDrop, onDragLeave }: DropAreaProps) => {
    const dropAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            onDragOver?.(e);
        };

        const getDraggableData = (e: DragEvent): DraggableData | undefined => {
            const data = e.dataTransfer?.getData('text/plain');
            return data && JSON.parse(data);
        };

        const handleDrop = (e: DragEvent): void => {
            e.preventDefault();
            const draggableData = getDraggableData(e);
            onDrop?.(e, draggableData);
        };

        const handleDragLeave = (e: DragEvent): void => {
            onDragLeave?.(e);
        };

        let copyRefValue: HTMLDivElement | null = null;

        if (dropAreaRef && dropAreaRef.current) {
            dropAreaRef.current.addEventListener('dragover', handleDragOver);
            dropAreaRef.current.addEventListener('drop', handleDrop);
            dropAreaRef.current.addEventListener('dragleave', handleDragLeave);
            copyRefValue = dropAreaRef.current;
        }

        return () => {
            if (copyRefValue) {
                copyRefValue.removeEventListener('dragover', handleDragOver);
                copyRefValue.removeEventListener('drop', handleDrop);
                copyRefValue.removeEventListener('dragleave', handleDragLeave);
            }
        };
    }, [ dropAreaRef, onDragLeave, onDragOver, onDrop ]);

    return [ dropAreaRef ];
};
