import { CreateFolderButton } from '../../d-features/createFolderButton/createFolderButton';
import type { Folder } from '../../f-shared/api/interfaces';
import { Card } from '../card/card';

interface FolderListProps {
	folders: Folder[];
}

export const FolderList = ({ folders }: FolderListProps) => {
	return (
		<div className="flex flex-col gap-[10px]">
			<div className="flex gap-[10px] align-center">
				<h3 className="font-semibold">Folders</h3>
				<CreateFolderButton/>
			</div>
			<div className="flex flex-wrap gap-[10px]">
				{folders.map(item => (
					<Card type="FOLDER" entity={item} key={item.id}/>
				))}
			</div>
		</div>
	);
};
