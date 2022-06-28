import { useState } from "react";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function LoadingError({ text, variant, severity }) {
	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					variant={variant}
					severity={severity}
					sx={{ width: "100%" }}
				>
					{text}
				</Alert>
			</Snackbar>
		</Box>
	);
}
