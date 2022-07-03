import { Fragment, useState } from "react";

import { IconButton } from "@mui/material";

import { EditRounded } from "@mui/icons-material";

import CustomerFormDialog from "../CustomerFormDialog";

import {
	cancelLabel,
	confirmEditLabel,
	editCustomerErrorSnackText,
	editCustomerSuccessSnackText,
	actionCancelledSnackText,
	editCustomerTitle,
} from "../../../../utils/strings";
import SnackMessage from "../../Snack/SnackMessage";

export default function OpenEditCustomerDialogButton({ data, refetch }) {
	const [open, setOpen] = useState(false);
	const [editCustomerResult, setEditCustomerResult] = useState(false);

	const handleClickOpen = () => {
		setEditCustomerResult("");
		setOpen(true);
	};

	const handleClickYes = () => {
		refetch();
		setOpen(false);
	};

	const handleClickNo = () => {
		setEditCustomerResult("cancelled");
		setOpen(false);
	};

	return (
		<div>
			<IconButton aria-label="modifica cliente" onClick={handleClickOpen}>
				<EditRounded color="primary" />
			</IconButton>

			{open && (
				<CustomerFormDialog
					title={
						<Fragment>
							{editCustomerTitle} {data.custCode}
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
					setResult={setEditCustomerResult}
				/>
			)}

			{editCustomerResult === "edited" && (
				<SnackMessage
					text={editCustomerSuccessSnackText}
					variant="filled"
					severity="success"
				/>
			)}
			{editCustomerResult === "error" && (
				<SnackMessage
					text={editCustomerErrorSnackText}
					variant="filled"
					severity="error"
				/>
			)}
			{editCustomerResult === "cancelled" && (
				<SnackMessage
					text={actionCancelledSnackText}
					variant="outlined"
					severity="warning"
				/>
			)}
		</div>
	);
}
