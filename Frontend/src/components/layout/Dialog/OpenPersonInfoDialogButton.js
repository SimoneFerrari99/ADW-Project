import { useState } from "react";

import { Button } from "@mui/material";

import AgentInfoDialog from "./AgentInfoDialog";

export default function OpenPersonInfoDialogButton({ agentCode }) {
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
			{open ? (
				<AgentInfoDialog
					title="Dettagli agente"
					open={open}
					handleClose={handleClose}
					agentCode={agentCode}
				/>
			) : null}
		</div>
	);
}
