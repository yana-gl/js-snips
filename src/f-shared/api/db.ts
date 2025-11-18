import Dexie, { type Table } from 'dexie';
import type { Folder, Snippet } from './interfaces';

export class DB extends Dexie {
	folders!: Table<Folder, string>;
	snippets!: Table<Snippet, string>;
	constructor() {
		super('snips');
		this.version(1).stores({
			folders: 'id, name, parentId',
			snippets: 'id, name, parentId, language, code'
		});
	}
}

export const db = new DB();
