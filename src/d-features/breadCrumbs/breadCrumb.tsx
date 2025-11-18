import { useNavigate } from "react-router-dom";
import type { DraggableData } from "../../e-entities/draggableData";
import { handleDrop } from "../../f-shared/lib/onDrop";
import { useDropArea } from "../../f-shared/hooks/useDragDrop/useDropArea";
import type { BreadCrumbType } from "../../f-shared/types/breadCrumb";
import clsx from "clsx";

interface DocumentCreateProps {
    item?: BreadCrumbType;
}

const homeBreadCrumb = { id: null, name: 'home' };

export const BreadCrumb = ({ item: { id, name } = homeBreadCrumb }: DocumentCreateProps) => {
    const onDrop = (e: DragEvent, data?: DraggableData) => handleDrop(e, id, data);
    const [ dropAreaRef, isDropActive ] = useDropArea({ onDrop });
    const navigate = useNavigate();

    const goToFolder = (id: string | null) => {
        if (id) {
            navigate(`/folder/${id}`);
        } else {
            navigate('/');
        }
    };

    return (
        <span
            onClick={() => goToFolder(id)}
            key={id}
            className={clsx(
                'cursor-pointer subtitle',
            )}
            ref={dropAreaRef}
        >
            &nbsp;
            <span
                className={clsx(
                    'border-2 px-3 py-2 rounded-2xl',
                    {
                        'border-[var(--blue-grid-color)] border-dashed bg-[var(--bg-color)]/60': isDropActive,
                        'border-transparent': !isDropActive,
                    }
                )}
            >
                {
                    name?.length > 10
                        ? `${name.slice(0, 10)}...`
                        : name
                }
            </span>
            &nbsp;
            /
        </span>
    );
};
