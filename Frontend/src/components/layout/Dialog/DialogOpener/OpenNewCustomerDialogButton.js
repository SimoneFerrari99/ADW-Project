import { useState } from "react";

import { Button } from "@mui/material";

import { CheckRounded, AddRounded } from "@mui/icons-material";

import CustomerFormDialog from "../CustomerFormDialog";
import SnackMessage from "../../Snack/SnackMessage";

import {
	cancelLabel,
	newCustomerButtonLabel,
	newCustomerTitle,
	insertCustomerLabel,
	newCustomerSuccessSnackText,
	newCustomerErrorSnackText,
	actionCancelledSnackText,
} from "../../../../utils/strings";

export default function OpenNewCustomerDialogButton({ data, refetch }) {
	const [open, setOpen] = useState(false);
	const [newCustomerResult, setNewCustomerResult] = useState(false);

	const handleClickOpen = () => {
		setNewCustomerResult("");
		setOpen(true);
	};

	const handleClickYes = () => {
		refetch();
		setOpen(false);
	};

	const handleClickNo = () => {
		setNewCustomerResult("cancelled");
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
				{newCustomerButtonLabel}
			</Button>

			{open && (
				<CustomerFormDialog
					title={newCustomerTitle}
					newMode={true}
					open={open}
					handleClickYes={handleClickYes}
					handleClickNo={handleClickNo}
					noText={cancelLabel}
					yesText={insertCustomerLabel}
					startIconYes={<CheckRounded />}
					setResult={setNewCustomerResult}
				/>
			)}
			{newCustomerResult === "created" && (
				<SnackMessage
					text={newCustomerSuccessSnackText}
					variant="filled"
					severity="success"
				/>
			)}
			{newCustomerResult === "error" && (
				<SnackMessage
					text={newCustomerErrorSnackText}
					variant="filled"
					severity="error"
				/>
			)}
			{newCustomerResult === "cancelled" && (
				<SnackMessage
					text={actionCancelledSnackText}
					variant="filled"
					severity="warning"
				/>
			)}
		</div>
	);
}
