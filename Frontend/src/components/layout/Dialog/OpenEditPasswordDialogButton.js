import { useState } from "react";
import { ReactSession } from "react-client-session";

import { Button } from "@mui/material";
import { LockReset } from "@mui/icons-material/";

import EditPasswordDialog from "./EditPasswordDialog";

import { editPasswordLabel } from "../../../utils/strings";

export default function OpenEditPasswordDialogButton({ handleClose }) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				autoFocus
				variant="contained"
				startIcon={<LockReset />}
				onClick={handleClickOpen}
			>
				{editPasswordLabel}
			</Button>

			{open && (
				<EditPasswordDialog
					title={editPasswordLabel}
					open={open}
					handleClose={handleClickClose}
					custCode={String(ReactSession.get("code"))}
				/>
			)}
		</div>
	);
}
