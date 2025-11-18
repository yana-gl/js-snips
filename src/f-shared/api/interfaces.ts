
export interface Folder {
	id: string;
	name: string;
	parentId: string | null;
}

export interface Snippet {
	id: string;
	name: string;
	parentId: string | null;
	language: string;
	code: string;
}
