import { CreateSnippetBtn } from "../../d-features/snippet-create/ui/CreateSnippetBtn";
import { Card } from "../../d-features/card/card";
import type { Snippet } from "../../f-shared/api/interfaces";

interface SnippetListProps {
	snippets: Snippet[];
}

export const SnippetList = ({ snippets }: SnippetListProps) => {
	return (
		<div className="flex flex-col gap-[10px]">
			<div className="flex gap-[10px] align-center">
				<h3 className="font-semibold">Snippets</h3>
				<CreateSnippetBtn/>
			</div>
			<div className="flex flex-wrap gap-[10px]">
				{snippets.map(item => (
					<Card type="SNIPPET" entity={item} key={item.id}/>
				))}
			</div>
		</div>
	);
};
