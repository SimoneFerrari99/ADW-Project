/* COMPONENTE PER I MESSAGGI DI FEEDBACK */

import { useState } from "react";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function SnackMessage({
	text,
	variant,
	severity,
	reset = () => {},
}) {
	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(false);
		reset("");
	};

	return (
		<Box sx={{ display: "flex" }}>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					variant={variant}
					severity={severity}
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
						fontSize: "1rem",
					}}
				>
					{text}
				</Alert>
			</Snackbar>
		</Box>
	);
}
