import * as React from "react";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function LoadingError() {
	const [open, setOpen] = React.useState(true);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: "100%" }}>
					Ouch, qualcosa è andato storto! Controlla la tua connessione internet.
				</Alert>
			</Snackbar>
		</Box>
	);
}
