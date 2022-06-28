import { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";

import { Typography, Box, Tooltip } from "@mui/material";

import {
	CallRounded,
	LanguageRounded,
	CurrencyExchangeRounded,
} from "@mui/icons-material";

import PersonInfoDialog from "./PersonInfoDialog";

import {
	commissionTooltipLabel,
	countryTooltipLabel,
	phoneNumberTooltipLabel,
} from "../../../utils/strings";

export default function AgentInfoDialog({
	title,
	open,
	handleClose,
	agentCode,
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
		<PersonInfoDialog
			title={title}
			open={open}
			handleClose={handleClose}
			loading={loading}
			error={error}
			personInfoDialogBody={
				<Fragment>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Typography sx={{ fontSize: "1.3rem", fontWeight: "bold" }}>
							{loading ? null : error ? null : data.agentById.agentName}
						</Typography>

						<Typography sx={{ fontSize: "1.3rem", fontWeight: "bold" }}>
							{loading ? null : error ? null : data.agentById.agentCode}
						</Typography>
					</Box>
					<Typography sx={{ fontSize: "1rem" }}>
						{loading ? null : error ? null : data.agentById.workingArea}
					</Typography>
					<Box sx={{ display: "flex", alignItems: "center", pt: 3 }}>
						<Tooltip title={phoneNumberTooltipLabel}>
							<CallRounded sx={{ mr: 2 }} />
						</Tooltip>
						{loading ? null : error ? null : data.agentById.phoneNO}
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
							{loading ? null : error ? null : data.agentById.country}
						</Box>
						<Box sx={{ display: "flex", alignItems: "center", pt: 1 }}>
							<Tooltip title={commissionTooltipLabel}>
								<CurrencyExchangeRounded fontSize="small" sx={{ mr: 1 }} />
							</Tooltip>
							{loading ? null : error ? null : data.agentById.commission}
						</Box>
					</Box>
				</Fragment>
			}
		/>
	);
}
