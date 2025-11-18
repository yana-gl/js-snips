/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import { RenameModal } from '../../d-features/renameModal/renameModal';
import { useCreateFolderHotkey, useCreateSnippetHotkey } from '../hooks/useHotKeys';

type CreateContextValue = {
	openCreateSnippet: () => void;
	openCreateFolder: () => void;
};

const CreateContext = createContext<CreateContextValue | null>(null);

export const CreateProvider = ({ children }: { children: ReactNode }) => {
	const [isSnippetOpen, setSnippetOpen] = useState(false);
	const [isFolderOpen, setFolderOpen] = useState(false);

	// общий флаг для отключения хоткеев, когда что-то уже открыто
	const hotkeysEnabled = !isSnippetOpen && !isFolderOpen;
	window.console.log(hotkeysEnabled);

	useCreateSnippetHotkey({
		enabled: hotkeysEnabled,
		create: () => setSnippetOpen(true),
	});

	useCreateFolderHotkey({
		enabled: hotkeysEnabled,
		create: () => setFolderOpen(true),
	});

	const value: CreateContextValue = {
		openCreateSnippet: () => setSnippetOpen(true),
		openCreateFolder: () => setFolderOpen(true),
	};

	return (
		<CreateContext.Provider value={value}>
			{children}
            {
                isSnippetOpen &&
                <RenameModal
                    open={isSnippetOpen}
                    setOpen={setSnippetOpen}
                    type="SNIPPET"
                />
            }
            {
                isFolderOpen &&
                <RenameModal
                    open={isFolderOpen}
                    setOpen={setFolderOpen}
                    type="FOLDER"
                />
            }
		</CreateContext.Provider>
	);
};

export const useCreateModals = () => {
	const ctx = useContext(CreateContext);
	if (!ctx) {
		throw new Error('useCreateModals must be used within CreateProvider');
	}
	return ctx;
};
