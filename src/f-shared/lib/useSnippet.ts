import { liveQuery } from 'dexie';
import { useEffect, useState } from 'react';
import { db } from '../api/db';
import type { Folder, Snippet } from '../api/interfaces';

type FolderContent = {
  folders: Folder[];
  snippets: Snippet[];
};

export function useFolderContent(folderId: string | null) {
  const [state, setState] = useState<FolderContent>({ folders: [], snippets: [] });

  useEffect(() => {
    const query = async (): Promise<FolderContent> => {
      const foldersPromise =
        folderId == null
          ? db.folders.filter(f => f.parentId == null).toArray()
          : db.folders.where('parentId').equals(folderId).toArray();

      const snippetsPromise =
        folderId == null
          ? db.snippets.filter(s => s.parentId == null).toArray()
          : db.snippets.where('parentId').equals(folderId).toArray();

      const [folders, snippets] = await Promise.all([foldersPromise, snippetsPromise]);
      return { folders, snippets };
    };

    const sub = liveQuery(query).subscribe({
      next: (v) => setState(v),
      error: (e) => console.error(e),
    });

    return () => sub.unsubscribe();
  }, [folderId]);

  return state;
}
