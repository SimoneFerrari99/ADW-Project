import { useState } from "react";

import { Button } from "@mui/material";

import SpecificPersonInfoDialog from "./SpecificPersonInfoDialog";

import { agentInfoDialogTitle } from "../../../utils/strings";

export default function OpenPersonInfoDialogButton({
	agentCode = null,
	custCode = null,
}) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				variant="outlined"
				sx={{ textDecoration: "underline" }}
				onClick={handleClickOpen}
			>
				{agentCode}
			</Button>
			{open && agentCode && !custCode && (
				<SpecificPersonInfoDialog
					title={agentInfoDialogTitle}
					open={open}
					handleClose={handleClose}
					agentCode={agentCode}
				/>
			)}
			{open &&
				!agentCode &&
				custCode &&
				{
					/* <AgentInfoDialog
					title={agentInfoDialogTitle}
					open={open}
					handleClose={handleClose}
					agentCode={agentCode}
				/> */
				}}
		</div>
	);
}
