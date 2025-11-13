
import { CreateFolderBtn } from '../../e-entities/folder-create/ui/CreateFolderBtn';
import { Card } from '../../d-features/card/card';
import type { Folder } from '../../f-shared/api/interfaces';

export const FolderList = ({ folders, folderId }: { folders: Folder[], folderId: string | null }) => {
	return (
		<div className="flex flex-col gap-[10px]">
			<div className="flex gap-[10px] align-center">
				<h3 className="font-semibold">Folders</h3>
				<CreateFolderBtn parentId={folderId || null}/>
			</div>
			<div className="grid grid-flow-col auto-cols-max md:auto-cols-min gap-[10px]">
				{folders.map(f => (
					<Card type="FOLDER" entity={f} key={f.id}/>
				))}
			</div>
		</div>
	);
};
