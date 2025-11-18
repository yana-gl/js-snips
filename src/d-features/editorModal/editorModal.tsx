import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { updateSnippet } from '../../e-entities/snippet/snippetStorage';
import type { Snippet } from '../../f-shared/api/interfaces';
import { BaseModal } from '../../f-shared/ui/baseModal/baseModal';
import { SaveModalFooter } from '../../f-shared/ui/baseModal/saveModalFooter';
import { useSaveHotkey } from '../../f-shared/hooks/useHotKeys';

interface EditorModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	snippet: Snippet;
}

export const EditorModal = ({ open, setOpen, snippet: {name, id, code: value = ''} }: EditorModalProps) => {
	const [ saving, setSaving ] = useState(false);
	const [ code, setCode ] = useState(value);

	// обновляем содержимое при каждом открытии/смене id/value
	useEffect(() => {
		if (open) setCode(value ?? '');
	}, [open, id, value]);

	const handleSave = async () => {
		if (!code) return;
		try {
			setSaving(true);
			await updateSnippet(id, {code});
		} finally {
			setSaving(false);
			setOpen(false);
		}
	};

	useSaveHotkey({ open, onSave: handleSave });

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<BaseModal
			open={open}
			setOpen={setOpen}
			modalTitle={name}
			onClose={handleClose}
			footer={<SaveModalFooter onSave={handleSave} disabled={saving} saving={saving}/>}
			contentClassName="max-w-[70vw] h-[85vh]"
		>
			{/* editor area — важен фиксированный размер */}
			<div className="flex-1 min-h-0">
				<Editor
					path={id} 
					defaultLanguage="javascript"
					height="100%"                // у родителя есть высота → редактор займет всё
					options={{
						minimap: { enabled: false },
						wordWrap: 'on',
						fontSize: 14,
						scrollBeyondLastLine: false,
						automaticLayout: true,
					}}
					value={code ?? ''}
					onChange={(v) => setCode(v ?? '')}
				/>
			</div>
		</BaseModal>
	  )
}
