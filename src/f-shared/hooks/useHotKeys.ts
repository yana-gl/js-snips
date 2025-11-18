import { useEffect } from 'react';

type UseHotkeyProps = {
	enabled: boolean; // включён ли хоткей
	key: string; // буква: 's', 'n', 'f'
	handler: () => void; // что вызываем
};

export const useHotkey = ({ enabled, key, handler }: UseHotkeyProps) => {
	useEffect(() => {
		if (!enabled) return;

		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === key) {
				e.preventDefault();
				handler();
			}
		};

		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [enabled, key, handler]);
};

type UseSaveHotkeyProps = {
	// сохранять можно только при открытой модалке
	open: boolean;
	onSave: () => void;
};

export const useSaveHotkey = ({ open, onSave }: UseSaveHotkeyProps) => {
	useHotkey({ enabled: open, key: 's', handler: onSave });
};

type UseCreateHotkeyProps = {
	enabled?: boolean;
	create: () => void;
};

export const useCreateSnippetHotkey = ({ enabled = true, create }: UseCreateHotkeyProps) => {
	useHotkey({ enabled, key: 'n', handler: create });
};

export const useCreateFolderHotkey = ({ enabled = true, create }: UseCreateHotkeyProps) => {
	useHotkey({ enabled, key: 'f', handler: create });
};
