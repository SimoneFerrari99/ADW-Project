import { useState } from "react";

import { Button } from "@mui/material";

import PersonDialog from "./PersonDialog";

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
				<PersonDialog
					title="Dettagli agente"
					open={open}
					handleClose={handleClose}
				/>
			) : null}
		</div>
	);
}
