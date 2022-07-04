import { useState } from "react";
import { gql, useApolloClient } from "@apollo/client";

import {
	Stack,
	Box,
	TextField,
	DialogActions,
	Button,
	Alert,
} from "@mui/material";

import InfoDialog from "./InfoDialog";
import {
	agentNameLabel,
	workingAreaLabel,
	countryLabel,
	phoneNOLabel,
	commissionLabel,
	requiredFieldLabel,
} from "../../../utils/strings";

export default function AgentFormDialog({
	title,
	editMode = null,
	newMode = null,
	dataFromRow,
	open,
	handleClickNo,
	handleClickYes,
	startIconYes,
	noText,
	yesText,
	setResult,
}) {
	const client = useApolloClient();

	const [called, setCalled] = useState(false);

	const [agentName, setAgentName] = useState(
		(editMode && dataFromRow.agentName) || ""
	);

	const [workingArea, setWorkingArea] = useState(
		(editMode && dataFromRow.workingArea) || ""
	);

	const [commission, setCommission] = useState(
		parseFloat(editMode && dataFromRow.commission) || ""
	);

	const [country, setCountry] = useState(
		(editMode && dataFromRow.country) || ""
	);

	const [phoneNO, setPhoneNO] = useState(
		(editMode && dataFromRow.phoneNO) || ""
	);

	const handleAgentNameChange = (event) => {
		setCalled(false);
		setAgentName(event.target.value);
	};

	const handleWorkingAreaChange = (event) => {
		setCalled(false);
		setWorkingArea(event.target.value);
	};

	const handleCommissionChange = (event) => {
		setCalled(false);
		setCommission(parseFloat(event.target.value));
	};

	const handlePhoneNOChange = (event) => {
		setCalled(false);
		setPhoneNO(event.target.value);
	};

	const handleCountryChange = (event) => {
		setCalled(false);
		setCountry(event.target.value);
	};

	const formErrors = () => {
		if (agentName === "" || phoneNO === "" || commission === "") {
			return true;
		} else {
			return false;
		}
	};

	const CREATE_OR_UPDATE_AGENT = gql`
		mutation createOrUpdateAgent(
			$agentCode: String
			$agentName: String!
			$workingArea: String!
			$commission: Float!
			$phoneNO: String!
			$country: String!
		) {
			createOrUpdateAgent(
				agentCode: $agentCode
				agent: {
					agentName: $agentName
					workingArea: $workingArea
					commission: $commission
					phoneNO: $phoneNO
					country: $country
				}
			) {
				agentCode
			}
		}
	`;

	const handleClickEditConfirm = async (event) => {
		event.preventDefault();

		setCalled(true);
		if (formErrors()) return;

		const { data } = await client.mutate({
			mutation: CREATE_OR_UPDATE_AGENT,
			variables: {
				agentCode: dataFromRow.agentCode,
				agentName: agentName,
				workingArea: workingArea,
				commission: commission,
				phoneNO: phoneNO,
				country: country,
			},
		});

		if (data.createOrUpdateAgent.agentCode) {
			setResult("edited");
			handleClickYes();
		} else {
			setResult("error");
		}
	};

	const handleClickNewAgentConfirm = async (event) => {
		event.preventDefault();
		setCalled(true);
		if (formErrors()) return;

		const { data } = await client.mutate({
			mutation: CREATE_OR_UPDATE_AGENT,
			variables: {
				agentCode: null,
				agentName: agentName,
				workingArea: workingArea,
				commission: commission,
				phoneNO: phoneNO,
				country: country,
			},
		});

		if (data.createOrUpdateAgent.agentCode) {
			setResult("created");
			handleClickYes();
		} else {
			setResult("error");
		}
	};

	return (
		<InfoDialog
			title={title}
			fullWidth={true}
			open={open}
			handleClose={handleClickNo}
			InfoDialogBody={
				<Box component="form" id="agentForm">
					<Stack spacing={2} sx={{ mb: 3 }}>
						{called && formErrors() && (
							<Alert severity="error">{requiredFieldLabel}</Alert>
						)}
					</Stack>
					<Stack spacing={2}>
						<Stack direction="row" spacing={2}>
							<TextField
								id="agentName"
								label={agentNameLabel}
								variant="outlined"
								type="text"
								fullWidth
								error={called && agentName === ""}
								required
								autoFocus
								value={agentName}
								onChange={handleAgentNameChange}
							/>
							<TextField
								id="workingArea"
								label={workingAreaLabel}
								variant="outlined"
								type="text"
								fullWidth
								value={workingArea}
								onChange={handleWorkingAreaChange}
							/>
						</Stack>

						<Stack direction="row" spacing={2}>
							<TextField
								id="phoneNO"
								label={phoneNOLabel}
								variant="outlined"
								type="text"
								fullWidth
								required
								error={called && phoneNO === ""}
								value={phoneNO}
								onChange={handlePhoneNOChange}
							/>
							<TextField
								id="country"
								label={countryLabel}
								variant="outlined"
								type="text"
								fullWidth
								value={country}
								onChange={handleCountryChange}
							/>
						</Stack>

						<Stack direction="row" spacing={2}>
							<TextField
								id="commission"
								label={commissionLabel}
								variant="outlined"
								type="number"
								InputProps={{ inputProps: { min: 0, max: 1 } }}
								fullWidth
								required
								error={called && commission === ""}
								value={commission}
								onChange={handleCommissionChange}
							/>
						</Stack>
					</Stack>
				</Box>
			}
			dialogActions={
				<DialogActions>
					<Stack direction="row" spacing={1} sx={{ mr: 1 }}>
						<Button variant="outlined" color="warning" onClick={handleClickNo}>
							{noText}
						</Button>
						<Button
							autoFocus={true}
							variant="contained"
							color={(editMode && "primary") || (newMode && "success")}
							type="submit"
							form="agentForm"
							onClick={
								(editMode && handleClickEditConfirm) ||
								(newMode && handleClickNewAgentConfirm)
							}
							startIcon={startIconYes}
						>
							{yesText}
						</Button>
					</Stack>
				</DialogActions>
			}
		/>
	);
}
