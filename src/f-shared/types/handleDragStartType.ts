import type { DragEvent } from "react"
import type { DraggableData } from "./draggableData"

export type HandleDragStartType = (e: DragEvent, draggableData: DraggableData) => void;
