import { useParams } from "react-router";
import { SnippetList } from "../../../c-widgets/snippetList/snippetList";
import { useEffect, useState } from "react";
import { getFolderBreadcrumbs } from "../../../e-entities/folder/model/repo.dexie";
import type { Folder } from "../../../f-shared/api/interfaces";
import { BreadCrumbs } from "../../../d-features/breadCrumbs/breadCrumbs";
import { useFolderContent } from "../../../f-shared/lib/useSnippet";
import { FolderList } from "../../../c-widgets/folderList/folderList";
import Logo from '../../../f-shared/source/logo.svg?react';

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
		<>
			<header className="bg-[#F7F5ED] p-[10px] border-b-[#BFD3D2] border-b-[2px] flex align-center justify-center">
				{/* todo: видео-инструкция */}
				<Logo className="h-[50px] cursor-pointer"/>
			</header>
			<div className="bg-grid-notebook h-screen flex flex-col p-[30px] gap-[30px] bg-[#F5F5F5]">
				<BreadCrumbs items={crumbs}/>
				<FolderList folders={folders} folderId={folderId || null}/>
				<SnippetList snippets={snippets} folderId={folderId || null}/>
			</div>
		</>
	);
}
