import { useParams } from "react-router";
import { SnippetList } from "../../../c-widgets/snippetList/snippetList";
import { useEffect, useState } from "react";
import { getFolderBreadcrumbs } from "../../../e-entities/folder/model/repo.dexie";
import type { Folder } from "../../../f-shared/api/interfaces";
import { BreadCrumbs } from "../../../d-features/breadCrumbs/breadCrumbs";
import { useFolderContent } from "../../../f-shared/lib/useSnippet";
import { FolderList } from "../../../c-widgets/folderList/FolderList";

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
		<div className="h-screen flex flex-col p-[30px] gap-[30px]">
			<BreadCrumbs items={crumbs}/>
			<FolderList folders={folders} folderId={folderId || null}/>
			<SnippetList snippets={snippets} folderId={folderId || null}/>
			{/* <DetailsPanel/> */}
		</div>
	);
}
