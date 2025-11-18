import { db } from "../../../f-shared/api/db";
import type { Snippet } from "../../../f-shared/api/interfaces";
import { v4 as uuidv4 } from 'uuid';

export async function createSnippet(p: Partial<Snippet> & { parentId: string | null }) {
	const s: Snippet = {
		id: uuidv4(),
		name: p.name ?? 'Untitled',
		parentId: p.parentId || null,
		language: p.language ?? 'plaintext',
		code: p.code ?? '',
	};
	await db.snippets.add(s);
	return s;
}

export async function updateSnippet(id: string, patch: Partial<Snippet>) {
	const s = await db.snippets.get(id);
	if (!s) throw new Error('Not found');
	const next: Snippet = {
		...s, ...patch,
	};
	await db.snippets.put(next); return next;
}

export const trashSnippet = (id: string) => db.snippets.delete(id);

export const moveSnippet = (id: string, newParentId: string | null) => updateSnippet(id, {parentId: newParentId});

export const listSnippetsByFolder = (folderId: string | null) => {
	window.console.log(folderId);
	if (folderId == null) {
		return db.snippets.filter(f => f.parentId == null).toArray();
	}
	return db.snippets.where('parentId').equals(folderId).toArray();
}
