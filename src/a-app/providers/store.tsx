/* eslint-disable react-refresh/only-export-components */
import { create } from 'zustand';

type UIState = {
  activeFolderId: string | null;
  activeSnippetId: string | null;
  query: string;
  set: (s: Partial<UIState>) => void;
};

export const useUI = create<UIState>((set) => ({
  activeFolderId: null, activeSnippetId: null, query: '',
  set: (s) => set(s)
}));

export const StoreProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const useAppUI = () => useUI();
