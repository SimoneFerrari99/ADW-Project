import { Fragment, useState } from "react";

import { IconButton } from "@mui/material";

import { EditRounded } from "@mui/icons-material";

import OrderFormDialog from "../OrderFormDialog";

import {
	cancelLabel,
	confirmEditLabel,
	editOrderTitle,
	ofLabel,
} from "../../../../utils/strings";

export default function OpenEditOrderDialogButton({ data, refetch }) {
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
				/>
			)}
		</div>
	);
}
