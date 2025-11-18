import { Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useCreateModals } from "../../../f-shared/context/createModalsContext";

export const CreateSnippetBtn = () => {
	const { openCreateFolder } = useCreateModals();

	return (
		<Tooltip title="New snippet (⌘/Ctrl+N)" placement="top">
			<AddIcon sx={{ cursor: 'pointer' }} onClick={openCreateFolder}/>
		</Tooltip>
	);
};
