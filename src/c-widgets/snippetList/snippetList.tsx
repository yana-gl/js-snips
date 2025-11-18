import { CreateSnippetButton } from "../../d-features/createSnippetButton/createSnippetButton";
import type { Snippet } from "../../f-shared/api/interfaces";
import { Card } from "../card/card";

interface SnippetListProps {
	snippets: Snippet[];
}

export const SnippetList = ({ snippets }: SnippetListProps) => {
	return (
		<div className="flex flex-col gap-[10px]">
			<div className="flex gap-[10px] align-center">
				<h3 className="font-semibold">Snippets</h3>
				<CreateSnippetButton/>
			</div>
			<div className="flex flex-wrap gap-[10px]">
				{snippets.map(item => (
					<Card type="SNIPPET" entity={item} key={item.id}/>
				))}
			</div>
		</div>
	);
};
