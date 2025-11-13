import { Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { RenameModal } from "../../../d-features/renameModal/renameModal";
import { useState } from "react";

export const CreateFolderBtn = ({ parentId }: { parentId: string|null }) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Tooltip title="New Folder" placement="top">
				<AddIcon sx={{ cursor: 'pointer' }} onClick={() => setOpen(true)}/>
			</Tooltip>
			{
				<RenameModal
					open={open}
					setOpen={setOpen}
					type={'FOLDER'}
					parentId={parentId}
				/>
			}
		</>
	);
};
