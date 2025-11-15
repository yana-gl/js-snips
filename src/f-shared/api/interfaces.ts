
export interface Folder {
	id: string;
	name: string;
	parentId: string | null;
	path: string;
	createdAt: number;
	updatedAt: number;
}

export interface Snippet {
	id: string;
	name: string;
	parentId: string | null;
	language: string;
	code: string;
	tags: string[];
	searchName: string;
	searchTags: string;
	searchCodeChunk?: string;
	favorites?: boolean;
	createdAt: number;
	updatedAt: number;
	version: number;
}
