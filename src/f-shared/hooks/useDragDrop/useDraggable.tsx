import { renderToString } from 'react-dom/server';
import type { DraggableData } from '../../../e-entities/draggableData';
import { useRef, type RefObject, type DragEvent as ReactDragEvent } from 'react';
import { DragElementContent } from '../../components/dragElementContent/dragElementContent';
import type { HandleDragStartType } from '../../types/handleDragStartType';

type UseDraggableData = {
	// вешаем на кастомный dragImage
	dragElementRef: RefObject<HTMLDivElement | null>;
	// вешаем на onDragStart у перетаскиваемого элемента
	handleDragStart: HandleDragStartType;
};

export function useDraggable(): UseDraggableData {
	const dragElementRef = useRef<HTMLDivElement>(null);

	const handleDragStart = (e: ReactDragEvent, draggableData: DraggableData) => {
		const { dataTransfer } = e;
		if (!dataTransfer) return;

		// убираем "зелёный плюс" (копирование), говорим браузеру что это move
		dataTransfer.effectAllowed = 'move';

		// показать изображение при перетаскивании
		const html = renderToString(
			<DragElementContent name={draggableData.name} type={draggableData.type}/>,
		);

		if (dragElementRef.current) {
			dragElementRef.current.innerHTML = html;
			// привязываем кастомный dragImage к курсору
			dataTransfer.setDragImage(dragElementRef.current, 0, 0);
		}
		// кладём полезные данные о том, что тащим
		dataTransfer.setData('text/plain', JSON.stringify(draggableData));
	};

	return { dragElementRef, handleDragStart };
}
