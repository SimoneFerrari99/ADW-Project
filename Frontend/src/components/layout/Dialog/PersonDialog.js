import { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";

import { styled } from "@mui/material/styles";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	Typography,
	Box,
	Tooltip,
	Skeleton,
} from "@mui/material";

import {
	CloseRounded,
	CallRounded,
	LanguageRounded,
	CurrencyExchangeRounded,
} from "@mui/icons-material";

import LoadingError from "../Error/LoadingError";

import {
	commissionTooltipLabel,
	countryTooltipLabel,
	phoneNumberTooltipLabel,
} from "../../../utils/strings";

const agentInfo = gql`
	query GetAgentInfoByAgentId {
		agentById(agentCode: "A001") {
			agentCode
			agentName
			workingArea
			commission
			phoneNO
			country
		}
	}
`;

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

export default function PersonDialog({ title, open, handleClose }) {
	const { data, loading, error } = useQuery(agentInfo);

	return (
		<BootstrapDialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={open}
			fullWidth
		>
			<BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
				{title}
			</BootstrapDialogTitle>
			<DialogContent dividers>
				{loading ? (
					<Skeleton variant="rectangular" width={210} height={118} />
				) : error ? (
					<LoadingError />
				) : (
					<Fragment>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography sx={{ fontSize: "1.3rem", fontWeight: "bold" }}>
								{data.agentById.agentName}
							</Typography>

							<Typography sx={{ fontSize: "1.3rem", fontWeight: "bold" }}>
								{data.agentById.agentCode}
							</Typography>
						</Box>
						<Typography sx={{ fontSize: "1rem" }}>
							{data.agentById.workingArea}
						</Typography>
						<Box sx={{ display: "flex", alignItems: "center", pt: 3 }}>
							<Tooltip title={phoneNumberTooltipLabel}>
								<CallRounded sx={{ mr: 2 }} />
							</Tooltip>
							{data.agentById.phoneNO}
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Box sx={{ display: "flex", alignItems: "center", pt: 1 }}>
								<Tooltip title={countryTooltipLabel}>
									<LanguageRounded sx={{ mr: 2 }} />
								</Tooltip>
								{data.agentById.country}
							</Box>
							<Box sx={{ display: "flex", alignItems: "center", pt: 1 }}>
								<Tooltip title={commissionTooltipLabel}>
									<CurrencyExchangeRounded fontSize="small" sx={{ mr: 1 }} />
								</Tooltip>
								0.22
							</Box>
						</Box>
					</Fragment>
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
