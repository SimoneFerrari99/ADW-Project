import { Fragment } from "react";

import { Stack, DialogActions, Button, Typography } from "@mui/material";

import InfoDialog from "./InfoDialog";

export default function ConfirmationDialog({
	title,
	text,
	open,
	handleClickNo,
	handleClickYes,
	startIconNo,
	startIconYes,
	noText,
	yesText,
	yesColor = "error",
}) {
	return (
		<InfoDialog
			title={title}
			fullWidth={false}
			open={open}
			handleClose={handleClickNo}
			InfoDialogBody={
				<Fragment>
					<Typography variant="p">{text}</Typography>
				</Fragment>
			}
			dialogActions={
				<DialogActions>
					<Stack direction="row" spacing={1} sx={{ mr: 1 }}>
						<Button
							variant="outlined"
							color="warning"
							onClick={handleClickNo}
							startIcon={startIconNo}
						>
							{noText}
						</Button>
						<Button
							autoFocus={true}
							variant="contained"
							color={yesColor}
							onClick={handleClickYes}
							startIcon={startIconYes}
						>
							{yesText}
						</Button>
					</Stack>
				</DialogActions>
			}
		/>
	);
}
