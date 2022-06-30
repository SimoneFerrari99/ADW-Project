import { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";

import { Typography, Box, Tooltip, DialogActions, Button } from "@mui/material";

import {
	CallRounded,
	LanguageRounded,
	EmojiEventsRounded,
	PersonRounded,
} from "@mui/icons-material";

import InfoDialog from "../../../components/layout/Dialog/PersonInfoDialog";
import OpenEditPasswordDialogButton from "../../../components/layout/Dialog/OpenEditPasswordDialogButton";

import {
	countryTooltipLabel,
	phoneNumberTooltipLabel,
	gradeTooltipLabel,
	agentTooltipLabel,
} from "../../../utils/strings";

export default function CustomerInfoDialog({
	title,
	open,
	handleClose,
	custCode,
}) {
	const customerInfo = gql`
		query getCustomerProfileInfo {
			customerById(custCode: "${custCode}") {
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

	const { data, loading, error } = useQuery(customerInfo);

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
									{data.customerById.custName}
								</Typography>

								<Typography sx={{ fontSize: "1.3rem", fontWeight: "bold" }}>
									{custCode}
								</Typography>
							</Box>
							<Typography sx={{ fontSize: "1rem" }}>
								{data.customerById.workingArea}
							</Typography>
							<Box sx={{ display: "flex", alignItems: "center", pt: 3 }}>
								<Tooltip title={agentTooltipLabel}>
									<PersonRounded sx={{ mr: 2 }} />
								</Tooltip>
								{data.customerById.agent.agentCode}, {data.customerById.agent.agentName}{" "}
								({data.customerById.agent.phoneNO})
							</Box>
							<Box sx={{ display: "flex", alignItems: "center", pt: 3 }}>
								<Tooltip title={phoneNumberTooltipLabel}>
									<CallRounded sx={{ mr: 2 }} />
								</Tooltip>
								{data.customerById.phoneNO}
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
									{data.customerById.custCity}, {data.customerById.custCountry}
								</Box>
								<Box sx={{ display: "flex", alignItems: "center", pt: 1 }}>
									<Tooltip title={gradeTooltipLabel}>
										<EmojiEventsRounded fontSize="small" sx={{ mr: 1 }} />
									</Tooltip>
									{data.customerById.grade}
								</Box>
							</Box>
						</Fragment>
					)}
				</Fragment>
			}
			dialogActions={
				<DialogActions>
					<OpenEditPasswordDialogButton />
				</DialogActions>
			}
		/>
	);
}
