import { useState } from "react";

import { Button } from "@mui/material";

import { CheckRounded, AddRounded } from "@mui/icons-material";

import OrderFormDialog from "../OrderFormDialog";
import SnackMessage from "../../Snack/SnackMessage";

import {
	cancelLabel,
	newCustomerButtonLabel,
	newOrderTitle,
	insertOrderLabel,
	newOrderSuccessSnackText,
	newOrderErrorSnackText,
	actionCancelledSnackText,
} from "../../../../utils/strings";

export default function OpenNewCustomerDialogButton({ data, refetch }) {
	const [open, setOpen] = useState(false);
	const [newOrderResult, setNewOrderResult] = useState(false);

	const handleClickOpen = () => {
		setNewOrderResult("");
		setOpen(true);
	};

	const handleClickYes = () => {
		refetch();
		setOpen(false);
	};

	const handleClickNo = () => {
		setNewOrderResult("cancelled");
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
				<OrderFormDialog
					title={newOrderTitle}
					newMode={true}
					open={open}
					handleClickYes={handleClickYes}
					handleClickNo={handleClickNo}
					noText={cancelLabel}
					yesText={insertOrderLabel}
					startIconYes={<CheckRounded />}
					setResult={setNewOrderResult}
				/>
			)}
			{newOrderResult === "created" && (
				<SnackMessage
					text={newOrderSuccessSnackText}
					variant="filled"
					severity="success"
				/>
			)}
			{newOrderResult === "error" && (
				<SnackMessage
					text={newOrderErrorSnackText}
					variant="filled"
					severity="error"
				/>
			)}
			{newOrderResult === "cancelled" && (
				<SnackMessage
					text={actionCancelledSnackText}
					variant="outlined"
					severity="warning"
				/>
			)}
		</div>
	);
}
