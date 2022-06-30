import { useState } from "react";

import { Button } from "@mui/material";

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
			<Button autoFocus onClick={handleClickOpen}>
				{editPasswordLabel}
			</Button>

			{open && (
				<EditPasswordDialog
					title={editPasswordLabel}
					open={open}
					handleClose={handleClickClose}
					custCode={"C00001"}
				/>
			)}
		</div>
	);
}
