import { Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { RenameModal } from "../../renameModal/renameModal";
import { useState } from "react";

export const CreateSnippetBtn = ({ parentId }: { parentId: string | null }) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Tooltip title="New snippet" placement="top">
				<AddIcon sx={{ cursor: 'pointer' }} onClick={() => setOpen(true)}/>
			</Tooltip>
			{
				<RenameModal
					open={open}
					setOpen={setOpen}
					type={'SNIPPET'}
					parentId={parentId}
				/>
			}
		</>
	);
};
