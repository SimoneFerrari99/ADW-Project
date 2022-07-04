import { useState } from "react";

import { Button } from "@mui/material";

import { CheckRounded, AddRounded } from "@mui/icons-material";

import AgentFormDialog from "../AgentFormDialog";
import SnackMessage from "../../Snack/SnackMessage";

import {
	cancelLabel,
	newAgentButtonLabel,
	newAgentLabel,
	newAgentSuccessSnackText,
	newAgentErrorSnackText,
	actionCancelledSnackText,
} from "../../../../utils/strings";

export default function OpenNewAgentDialogButton({ data, refetch }) {
	const [open, setOpen] = useState(false);
	const [newAgentResult, setNewAgentResult] = useState(false);

	const handleClickOpen = () => {
		setNewAgentResult("");
		setOpen(true);
	};

	const handleClickYes = () => {
		refetch();
		setOpen(false);
	};

	const handleClickNo = () => {
		setNewAgentResult("cancelled");
		setOpen(false);
	};

	return (
		<div>
			<Button
				variant="contained"
				color="success"
				startIcon={<AddRounded />}
				onClick={handleClickOpen}
			>
				{newAgentButtonLabel}
			</Button>

			{open && (
				<AgentFormDialog
					title={newAgentLabel}
					newMode={true}
					open={open}
					handleClickYes={handleClickYes}
					handleClickNo={handleClickNo}
					noText={cancelLabel}
					yesText={newAgentLabel}
					startIconYes={<CheckRounded />}
					setResult={setNewAgentResult}
				/>
			)}
			{newAgentResult === "created" && (
				<SnackMessage
					text={newAgentSuccessSnackText}
					variant="filled"
					severity="success"
				/>
			)}
			{newAgentResult === "error" && (
				<SnackMessage
					text={newAgentErrorSnackText}
					variant="filled"
					severity="error"
				/>
			)}
			{newAgentResult === "cancelled" && (
				<SnackMessage
					text={actionCancelledSnackText}
					variant="outlined"
					severity="warning"
				/>
			)}
		</div>
	);
}
