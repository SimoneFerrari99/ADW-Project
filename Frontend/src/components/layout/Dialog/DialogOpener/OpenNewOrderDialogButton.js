import { useState } from "react";

import { Button } from "@mui/material";

import { CheckRounded, AddRounded } from "@mui/icons-material";

import OrderFormDialog from "../OrderFormDialog";

import {
	cancelLabel,
	confirmEditLabel,
	editOrderTitle,
	newOrderButtonLabel,
	newOrderTitle,
	insertOrderLabel,
} from "../../../../utils/strings";

export default function OpenNewOrderDialogButton({ data, refetch }) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickYes = () => {
		refetch();
		setOpen(false);
	};

	const handleClickNo = () => {
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
				{newOrderButtonLabel}
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
				/>
			)}
		</div>
	);
}
