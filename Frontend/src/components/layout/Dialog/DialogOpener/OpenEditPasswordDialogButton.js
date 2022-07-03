import { useState } from "react";

import { Button } from "@mui/material";
import { LockReset } from "@mui/icons-material/";

import EditPasswordDialog from "../EditPasswordDialog";
import SnackMessage from "../../Snack/SnackMessage";

import {
	editPasswordLabel,
	passwordChangedSnackText,
} from "../../../../utils/strings";

export default function OpenEditPasswordDialogButton() {
	const [open, setOpen] = useState(false);
	const [editPasswordResult, setEditPasswordResult] = useState("");

	const handleClickOpen = () => {
		setEditPasswordResult("");
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
					setResult={setEditPasswordResult}
				/>
			)}
			{editPasswordResult === "success" && (
				<SnackMessage
					text={passwordChangedSnackText}
					variant="filled"
					severity="success"
				/>
			)}
		</div>
	);
}
