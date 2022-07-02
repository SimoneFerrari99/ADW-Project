import { useState } from "react";

import { IconButton } from "@mui/material";

import ConfirmationDialog from "./ConfirmationDialog";

export default function OpenConfirmationDialogButton({
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
			<IconButton aria-label={ariaLabel} onClick={handleClickOpen}>
				{iconButton}
			</IconButton>

			{open && (
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
			)}
		</div>
	);
}
