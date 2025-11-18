import { db } from "../../f-shared/api/db";
import type { Folder } from "../../f-shared/api/interfaces";
import { v4 as uuidv4 } from 'uuid';

export async function createFolder(name: string, parentId: string|null) {
	const id = uuidv4();
	const folder: Folder = { id, name, parentId };
	await db.folders.add(folder);
	return folder;
}

export async function listChildren(parentId: string | null) {
	if (parentId == null) {
		// корневые папки: индекс по parentId не сработает для null
		return db.folders.filter(f => f.parentId == null).toArray();
	}
	// обычный случай — используем индекс
	return db.folders.where('parentId').equals(parentId).toArray();
}

export async function getFolderBreadcrumbs(folderId: string) {
	const chain: Folder[] = [];
	let current = await db.folders.get(folderId);
	if (!current) return [];

	while (current) {
		chain.push(current);
		if (!current.parentId) break;
		current = await db.folders.get(current.parentId);
	}

	return chain.reverse();
}

export async function updateFolder(id: string, patch: Partial<Folder>) {
	const s = await db.folders.get(id);if (!s) throw new Error('Not found');
	const next: Folder = {
		...s, ...patch,
	};
	await db.folders.put(next); return next;
}

export const trashFolder = async (rootId: string) => {
	await db.transaction('rw', db.folders, db.snippets, async () => {
		const folderIds: string[] = [];
		const stack: string[] = [rootId];

		// 1. Собираем все id папок в поддереве
		while (stack.length > 0) {
			const currentId = stack.pop()!;
			folderIds.push(currentId);

			const children = await db.folders
				.where('parentId')
				.equals(currentId)
				.toArray();

			for (const child of children) {
				stack.push(child.id);
			}
		}

		// 2. Удаляем все сниппеты из этих папок
		if (folderIds.length > 0) {
			await db.snippets
				.where('parentId')
				.anyOf(folderIds)
				.delete();
		}

		// 3. Удаляем сами папки
		await db.folders.bulkDelete(folderIds);
	});
};

export const moveFolder = (id: string, newParentId: string | null) => updateFolder(id, {parentId: newParentId});
