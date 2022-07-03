import { Fragment, useState } from "react";

import { IconButton } from "@mui/material";

import { EditRounded } from "@mui/icons-material";

import OrderFormDialog from "../OrderFormDialog";

import {
	cancelLabel,
	confirmEditLabel,
	editOrderErrorSnackText,
	editOrderSuccessSnackText,
	actionCancelledSnackText,
	editOrderTitle,
	ofLabel,
} from "../../../../utils/strings";
import SnackMessage from "../../Snack/SnackMessage";

export default function OpenEditOrderDialogButton({ data, refetch }) {
	const [open, setOpen] = useState(false);
	const [editOrderResult, setEditOrderResult] = useState(false);

	const handleClickOpen = () => {
		setEditOrderResult("");
		setOpen(true);
	};

	const handleClickYes = () => {
		refetch();
		setOpen(false);
	};

	const handleClickNo = () => {
		setEditOrderResult("cancelled");
		setOpen(false);
	};

	return (
		<div>
			<IconButton aria-label="modifica ordine" onClick={handleClickOpen}>
				<EditRounded color="primary" />
			</IconButton>

			{open && (
				<OrderFormDialog
					title={
						<Fragment>
							{editOrderTitle} {data.ordNum} {ofLabel} {data.ordDate}
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
					setResult={setEditOrderResult}
				/>
			)}

			{editOrderResult === "edited" && (
				<SnackMessage
					text={editOrderSuccessSnackText}
					variant="filled"
					severity="success"
				/>
			)}
			{editOrderResult === "error" && (
				<SnackMessage
					text={editOrderErrorSnackText}
					variant="filled"
					severity="error"
				/>
			)}
			{editOrderResult === "cancelled" && (
				<SnackMessage
					text={actionCancelledSnackText}
					variant="outlined"
					severity="warning"
				/>
			)}
		</div>
	);
}
