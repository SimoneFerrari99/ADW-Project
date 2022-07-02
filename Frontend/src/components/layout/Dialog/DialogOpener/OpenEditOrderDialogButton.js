import { useState } from "react";

import { IconButton } from "@mui/material";

import { EditRounded } from "@mui/icons-material";

import ConfirmationDialog from "../ConfirmationDialog";

export default function OpenEditOrderDialogButton({
	iconButton,
	confirmationTitle,
	confirmationText,
	ariaLabel,
	handleConfirmation,
	startIconNo = null,
	startIconYes = null,
	noText = "no",
	yesText = "yes",
}) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickYes = () => {
		handleConfirmation();
		setOpen(false);
	};

	const handleClickNo = () => {
		setOpen(false);
	};

	return (
		<div>
			<IconButton aria-label="Modifica ordine">
				<EditRounded color="primary" />
			</IconButton>

			{/* {open && (
				<ConfirmationDialog
					title={confirmationTitle}
					text={confirmationText}
					open={open}
					handleClickYes={handleClickYes}
					handleClickNo={handleClickNo}
					noText={noText}
					yesText={yesText}
					startIconNo={startIconNo}
					startIconYes={startIconYes}
				/>
			)} */}
		</div>
	);
}
