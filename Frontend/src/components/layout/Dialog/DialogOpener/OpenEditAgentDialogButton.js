import { Fragment, useState } from "react";

import { IconButton } from "@mui/material";

import { EditRounded } from "@mui/icons-material";

import AgentFormDialog from "../AgentFormDialog";

import {
	cancelLabel,
	confirmEditLabel,
	editAgentErrorSnackText,
	editAgentSuccessSnackText,
	actionCancelledSnackText,
	editAgentTitle,
} from "../../../../utils/strings";
import SnackMessage from "../../Snack/SnackMessage";

export default function OpenEditAgentDialogButton({ data, refetch }) {
	const [open, setOpen] = useState(false);
	const [editAgentResult, setEditAgentResult] = useState(false);

	const handleClickOpen = () => {
		setEditAgentResult("");
		setOpen(true);
	};

	const handleClickYes = () => {
		refetch();
		setOpen(false);
	};

	const handleClickNo = () => {
		setEditAgentResult("cancelled");
		setOpen(false);
	};

	return (
		<div>
			<IconButton aria-label="modifica cliente" onClick={handleClickOpen}>
				<EditRounded color="primary" />
			</IconButton>

			{open && (
				<AgentFormDialog
					title={
						<Fragment>
							{editAgentTitle} {data.agentCode}
						</Fragment>
					}
					editMode={true}
					dataFromRow={data}
					open={open}
					handleClickYes={handleClickYes}
					handleClickNo={handleClickNo}
					noText={cancelLabel}
					yesText={confirmEditLabel}
					startIconYes={<EditRounded />}
					setResult={setEditAgentResult}
				/>
			)}

			{editAgentResult === "edited" && (
				<SnackMessage
					text={editAgentSuccessSnackText}
					variant="filled"
					severity="success"
				/>
			)}
			{editAgentResult === "error" && (
				<SnackMessage
					text={editAgentErrorSnackText}
					variant="filled"
					severity="error"
				/>
			)}
			{editAgentResult === "cancelled" && (
				<SnackMessage
					text={actionCancelledSnackText}
					variant="filled"
					severity="warning"
				/>
			)}
		</div>
	);
}
