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
	EmojiEventsRounded,
	PersonRounded,
	ContentCopyRounded,
	CurrencyExchangeRounded,
} from "@mui/icons-material";

import InfoDialog from "./InfoDialog";
import OpenEditPasswordDialogButton from "./DialogOpener/OpenEditPasswordDialogButton";

import {
	countryTooltipLabel,
	phoneNumberTooltipLabel,
	gradeTooltipLabel,
	commissionTooltipLabel,
	agentTooltipLabel,
} from "../../../utils/strings";

import { copy } from "../../../utils/functions/copy";

export default function SpecificPersonInfoDialog({
	title,
	open,
	handleClose,
	custCode = null,
	agentCode = null,
	myProfileInfo = false,
}) {
	const getAgentProfileInfoQuery = gql`
		query GetAgentInfoByAgentId($agentCode: String!) {
			agentById(agentCode: $agentCode) {
				agentCode
				agentName
				workingArea
				commission
				phoneNO
				country
			}
		}
	`;

	const getCustomerProfileInfoQuery = gql`
		query getCustomerProfileInfo($custCode: String!) {
			customerById(custCode: $custCode) {
				custName
				custCity
				workingArea
				custCountry
				grade
				phoneNO
				agent {
					agentCode
					agentName
					phoneNO
				}
			}
		}
	`;

	const { data, loading, error } = useQuery(
		(custCode && getCustomerProfileInfoQuery) ||
			(agentCode && getAgentProfileInfoQuery),
		(custCode && {
			variables: {
				custCode: custCode,
			},
		}) ||
			(agentCode && {
				variables: {
					agentCode: agentCode,
				},
			})
	);

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
									{(custCode && data.customerById.custName) ||
										(agentCode && data.agentById.agentName)}
								</Typography>

								<Typography sx={{ fontSize: "1.3rem", fontWeight: "bold" }}>
									{custCode || agentCode}
								</Typography>
							</Box>
							<Typography sx={{ fontSize: "1rem" }}>
								{(custCode && data.customerById.workingArea) ||
									(agentCode && data.agentById.workingArea)}
							</Typography>
							{custCode && myProfileInfo && (
								<Box sx={{ display: "flex", alignItems: "center", pt: 3 }}>
									<Tooltip title={agentTooltipLabel}>
										<PersonRounded sx={{ mr: 2 }} />
									</Tooltip>
									{data.customerById.agent.agentCode},{" "}
									{data.customerById.agent.agentName} ({data.customerById.agent.phoneNO})
								</Box>
							)}
							<Box sx={{ display: "flex", alignItems: "center", pt: 3 }}>
								<Tooltip title={phoneNumberTooltipLabel}>
									<CallRounded sx={{ mr: 2 }} />
								</Tooltip>
								<span id="phone">
									{(custCode && data.customerById.phoneNO) ||
										(agentCode && data.agentById.phoneNO)}
								</span>
								<IconButton
									aria-label="copia numero telefono"
									onClick={() => copy("phone")}
								>
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
									{(custCode &&
										data.customerById.custCity + ", " + data.customerById.custCountry) ||
										(agentCode && data.agentById.country)}
								</Box>
								<Box sx={{ display: "flex", alignItems: "center", pt: 1 }}>
									<Tooltip
										title={
											(custCode && gradeTooltipLabel) ||
											(agentCode && commissionTooltipLabel)
										}
									>
										{(custCode && (
											<EmojiEventsRounded fontSize="small" sx={{ mr: 1 }} />
										)) ||
											(agentCode && (
												<CurrencyExchangeRounded fontSize="small" sx={{ mr: 1 }} />
											))}
									</Tooltip>
									{(custCode && data.customerById.grade) || data.agentById.commission}
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
