import { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";

import {
	Typography,
	Box,
	Tooltip,
	DialogActions,
	IconButton,
} from "@mui/material";

import {
	CallRounded,
	LanguageRounded,
	CurrencyExchangeRounded,
	ContentCopyRounded,
} from "@mui/icons-material";

import InfoDialog from "../../../components/layout/Dialog/PersonInfoDialog";
import OpenEditPasswordDialogButton from "../../../components/layout/Dialog/OpenEditPasswordDialogButton";

import {
	commissionTooltipLabel,
	countryTooltipLabel,
	phoneNumberTooltipLabel,
} from "../../../utils/strings";

import { copy } from "../../../utils/functions/copy";

export default function AgentInfoDialog({
	title,
	open,
	handleClose,
	agentCode,
	myProfileInfo = false,
}) {
	const agentInfo = gql`
		query GetAgentInfoByAgentId {
			agentById(agentCode: "${agentCode}") {
				agentCode
				agentName
				workingArea
				commission
				phoneNO
				country
			}
		}
	`;

	const { data, loading, error } = useQuery(agentInfo);

	return (
		<InfoDialog
			title={title}
			open={open}
			handleClose={handleClose}
			loading={loading}
			error={error}
			InfoDialogBody={
				<Fragment>
					{!loading && !error && (
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
								<span id="phone">{data.agentById.phoneNO}</span>
								<IconButton onClick={() => copy("phone")}>
									<ContentCopyRounded />
								</IconButton>
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
									{data.agentById.commission}
								</Box>
							</Box>
						</Fragment>
					)}
				</Fragment>
			}
			dialogActions={
				myProfileInfo && (
					<DialogActions>
						<OpenEditPasswordDialogButton />
					</DialogActions>
				)
			}
		/>
	);
}
