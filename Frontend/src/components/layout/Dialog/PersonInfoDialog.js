import {
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	Skeleton,
} from "@mui/material";

import { CloseRounded } from "@mui/icons-material";

import { styled } from "@mui/material/styles";

import LoadingError from "../Error/LoadingError";

const BootstrapDialogTitle = ({ children, onClose, ...other }) => {
	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="chiudi"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseRounded />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

export default function PersonInfoDialog({
	title,
	open,
	handleClose,
	loading,
	error,
	personInfoDialogBody,
}) {
	return (
		<BootstrapDialog
			onClose={handleClose}
			aria-labelledby="personInfo-dialog-title"
			open={open}
			fullWidth
		>
			<BootstrapDialogTitle id="personInfo-dialog-title" onClose={handleClose}>
				{title}
			</BootstrapDialogTitle>
			<DialogContent dividers>
				{loading ? (
					<Skeleton variant="rectangular" width={210} height={118} />
				) : error ? (
					<LoadingError />
				) : (
					personInfoDialogBody
				)}
			</DialogContent>
		</BootstrapDialog>
	);
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));
