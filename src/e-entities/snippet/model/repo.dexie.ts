import { db } from "../../../f-shared/api/db";
import type { Snippet } from "../../../f-shared/api/interfaces";

export async function createSnippet(p: Partial<Snippet> & { parentId: string | null }) {
	const now = Date.now();
	const s: Snippet = {
		id: crypto.randomUUID(),
		name: p.name ?? 'Untitled',
		parentId: p.parentId || null,
		language: p.language ?? 'plaintext',
		code: p.code ?? '',
		tags: p.tags ?? [],
		searchName: (p.name ?? 'untitled').toLowerCase(),
		searchTags: (p.tags ?? []).map(t => t.toLowerCase()).join(' '),
		searchCodeChunk: (p.code ?? '').slice(0, 4096).toLowerCase(),
		createdAt: now, updatedAt: now, version: 1
	};
	await db.snippets.add(s);
	return s;
}

export async function updateSnippet(id: string, patch: Partial<Snippet>) {
	const s = await db.snippets.get(id);if (!s) throw new Error('Not found');
	const next: Snippet = {
		...s, ...patch,
		searchName: (patch.name ?? s.name).toLowerCase(),
		searchTags: (patch.tags ?? s.tags).map(t=>t.toLowerCase()).join(' '),
		searchCodeChunk: (patch.code ?? s.code).slice(0, 4096).toLowerCase(),
		updatedAt: Date.now(), version: s.version + 1
	};
	await db.snippets.put(next); return next;
}

export const trashSnippet = (id: string) => db.snippets.update(id, { deletedAt: Date.now() });

export const listSnippetsByFolder = (folderId: string | null) => {
	window.console.log(folderId);
	if (folderId == null) {
		return db.snippets.filter(f => f.parentId == null).filter(s => !s.deletedAt).toArray();
	}
	return db.snippets.where('parentId').equals(folderId).filter(s => !s.deletedAt).toArray();
}
