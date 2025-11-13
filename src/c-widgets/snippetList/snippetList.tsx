import { CreateSnippetBtn } from "../../d-features/snippet-create/ui/CreateSnippetBtn";
import { Card } from "../../d-features/card/card";
import type { Snippet } from "../../f-shared/api/interfaces";

export const SnippetList = ({ snippets, folderId }: { snippets: Snippet[], folderId: string | null }) => {
	return (
		<div className="flex flex-col gap-[10px]">
			<div className="flex gap-[10px] align-center">
				<h3 className="font-semibold">Snippets</h3>
				<CreateSnippetBtn parentId={folderId || null}/>
			</div>
			<div className="grid grid-flow-col auto-cols-max md:auto-cols-min gap-[10px]">
			{snippets.map(f => (
				<Card type="SNIPPET" entity={f} key={f.id}/>
			))}
			</div>
		</div>
	);
};
