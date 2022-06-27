import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import { styled } from "@mui/material/styles";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const agentInfo = gql`
	query GetAgentInfoByAgentId {
		agentById(custCode: "A001") {
			agentCode
			agentName
			workingArea
			commission
			phoneNO
			country
		}
	}
`;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

const BootstrapDialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

export default function PersonInfoDialog({ codeToShow }) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				variant="outlined"
				sx={{ textDecoration: "underline" }}
				onClick={handleClickOpen}
			>
				{codeToShow}
			</Button>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
					Dettagli agente
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
						ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur
						ac, vestibulum at eros.
					</Typography>
					<Typography gutterBottom>
						Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
						Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
					</Typography>
					<Typography gutterBottom>
						Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
						magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
						ullamcorper nulla non metus auctor fringilla.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						Save changes
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</div>
	);
}
