import { Button } from '@mui/material';

interface EditorModalProps {
	saving?: boolean;
	disabled?: boolean;
	onSave: () => void;
}

export const SaveModalFooter = ({ saving, disabled = saving, onSave }: EditorModalProps) => {
	return (
		<div className="flex items-center justify-between gap-3 px-3 py-2 border-t border-neutral-200">
			<span className="text-xs text-neutral-500">⌘/Ctrl+S to save</span>
			<Button onClick={onSave} variant="contained" disabled={disabled}>
				{saving ? 'Saving…' : 'Save'}
			</Button>
		</div>
	  );
};
