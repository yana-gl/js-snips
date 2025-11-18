import { useEffect, useRef, useState } from 'react';
import type { DraggableData } from '../types/draggableData';

interface DropAreaProps {
    onDragOver?: (e: DragEvent) => void;
    onDragLeave?: (e: DragEvent) => void;
    onDrop?: (e: DragEvent, draggableData?: DraggableData) => void;
}

export const useDropArea = ({ onDragOver, onDrop, onDragLeave }: DropAreaProps) => {
    const [isDropActive, setIsDropActive] = useState(false);
    const dropAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // делаем копию, так как к моменту размонтирования dropAreaRef.current может уже указывать на другой элемент или быть null (а нам нужно отписаться от событий)
        const copyRefValue = dropAreaRef.current;
        if (!copyRefValue) return;

        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            setIsDropActive(true);
            onDragOver?.(e);
        };

        const getDraggableData = (e: DragEvent): DraggableData | undefined => {
            const data = e.dataTransfer?.getData('text/plain');
            return data && JSON.parse(data);
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            setIsDropActive(false);
            const draggableData = getDraggableData(e);
            onDrop?.(e, draggableData);
        };

        const handleDragLeave = (e: DragEvent) => {
            setIsDropActive(false);
            onDragLeave?.(e);
        };

        copyRefValue.addEventListener('dragover', handleDragOver);
        copyRefValue.addEventListener('drop', handleDrop);
        copyRefValue.addEventListener('dragleave', handleDragLeave);

        return () => {
            copyRefValue.removeEventListener('dragover', handleDragOver);
            copyRefValue.removeEventListener('drop', handleDrop);
            copyRefValue.removeEventListener('dragleave', handleDragLeave);
        };
    }, [onDragLeave, onDragOver, onDrop]);

    return [dropAreaRef, isDropActive] as const;
};
