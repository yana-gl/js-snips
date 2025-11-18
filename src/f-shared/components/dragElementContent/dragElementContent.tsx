import snippetIcon from '../../../f-shared/assets/file.png';
import folderIcon from '../../../f-shared/assets/folder.png';

interface DragElementContentProps {
    name: string;
    type: 'SNIPPET' | 'FOLDER';
}

export const DragElementContent = ({ name, type }: DragElementContentProps) => {
	const isSnippet = type === 'SNIPPET';
    const iconSrc = isSnippet ? snippetIcon : folderIcon;
    const iconAlt = isSnippet ? 'snippet icon' : 'folder icon';

    return (
        <div
            className="bg-[var(--bg-color)] shadow-xl p-[10px] border-[1px] border-[var(--blue-grid-color)] rounded-2xl flex align-center gap-[10px]"
        >
            <img
				src={iconSrc}
				alt={iconAlt}
				className="w-[20px] h-[20px]"
			/>
            <div>
                {name}
            </div>
        </div>
    );
};
