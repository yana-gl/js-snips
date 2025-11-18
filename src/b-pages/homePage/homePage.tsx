import { useParams } from 'react-router-dom';
import { SnippetList } from '../../c-widgets/snippetList/snippetList';
import { useEffect, useState } from 'react';
import { getFolderBreadcrumbs } from '../../e-entities/folder/folderStorage';
import type { Folder } from '../../f-shared/api/interfaces';
import { BreadCrumbs } from '../../c-widgets/breadCrumbs/breadCrumbs';
import { useFolderContent } from '../../f-shared/hooks/useFolderContent';
import { FolderList } from '../../c-widgets/folderList/folderList';
import Logo from '../../f-shared/assets/logo.svg?react';
import { CreateProvider } from '../../f-shared/context/createModalsContext';

export const HomePage = () => {
	const { folderId } = useParams();
	const {snippets, folders} = useFolderContent(folderId || null);
	const [ crumbs, setCrumbs ] = useState<Folder[]>([]);

	useEffect(() => {
		if (folderId) {
			getFolderBreadcrumbs(folderId)
				.then(setCrumbs);
		} else {
			setCrumbs([]);
		}
	}, [folderId]);

	return (
		<CreateProvider>
			<header className="bg-[var(--bg-color)] p-[10px] border-b-[var(--blue-grid-color)] border-b-[2px] flex align-center justify-center">
				<Logo className="h-[50px] cursor-pointer"/>
			</header>
			<div className="flex flex-col gap-[30px] h-screen p-[30px] bg-grid-notebook">
				<BreadCrumbs items={crumbs}/>
				<FolderList folders={folders}/>
				<SnippetList snippets={snippets}/>
			</div>
		</CreateProvider>
	);
};
