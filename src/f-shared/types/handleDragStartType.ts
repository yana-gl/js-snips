import type { DragEvent } from "react"
import type { DraggableData } from "../../e-entities/draggableData"

export type HandleDragStartType = (e: DragEvent, draggableData: DraggableData) => void;
