import { Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCreateModals } from '../../f-shared/context/createModalsContext';

export const CreateFolderButton = () => {
	const { openCreateFolder } = useCreateModals();

	return (
		<Tooltip title="New Folder (⌘/Ctrl+F)" placement="top">
			<AddIcon sx={{ cursor: 'pointer' }} onClick={openCreateFolder}/>
		</Tooltip>
	);
};
