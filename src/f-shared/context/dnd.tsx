/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode, type RefObject } from 'react';
import type { HandleDragStartType } from '../types/handleDragStartType';
import { useDraggable } from '../hooks/useDragDrop/useDraggable';

type DragDropContextValue = {
	dragElementRef: RefObject<HTMLDivElement | null>;
	handleDragStart: HandleDragStartType;
};

const DragDropContext = createContext<DragDropContextValue | null>(null);

export const DragDropProvider = ({ children }: { children: ReactNode }) => {
	const { dragElementRef, handleDragStart } = useDraggable();

	return (
		<>
			<DragDropContext.Provider value={{ dragElementRef, handleDragStart }}>
				{children}
			</DragDropContext.Provider>
			{/* контейнер для кастомного dragImage */}
			<div
				ref={dragElementRef}
				className="absolute pointer-events-none -top-[9999px]"
			/>
		</>
	);
};

export const useDragDropContext = () => {
	const ctx = useContext(DragDropContext);
	if (!ctx) {
		throw new Error('useDragDropContext must be used within DragDropProvider');
	}
	return ctx;
};
