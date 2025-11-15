import Dexie, { type Table } from 'dexie';
import type { Folder, Snippet } from './interfaces';

export class DB extends Dexie {
	folders!: Table<Folder, string>;
	snippets!: Table<Snippet, string>;
	constructor() {
		super('snips');
		this.version(1).stores({
		folders: 'id, parentId, path, updatedAt',
		snippets: 'id, parentId, searchName, searchTags, updatedAt, favorites'
		});
	}
}

export const db = new DB();
