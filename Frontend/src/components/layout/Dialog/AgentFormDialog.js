import { useState } from "react";
import { gql, useApolloClient } from "@apollo/client";

import {
	Stack,
	Box,
	TextField,
	DialogActions,
	Button,
	Alert,
	Divider,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";

import InfoDialog from "./InfoDialog";
import {
	agentNameLabel,
	workingAreaLabel,
	countryLabel,
	phoneNOLabel,
	commissionLabel,
	requiredFieldLabel,
	noEmailFoundLabel,
	noTypeFoundLabel,
	userTypeLabel,
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

	/* FORM FIELD USER CREDENTIALS */

	const GET_USER_INFO = gql`
		query getUserInfo($code: String!) {
			userById(code: $code) {
				email
				typology
				active
			}
		}
	`;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState("");
	const [active, setActive] = useState(true);

	const [NoUserFound, setNoUserFound] = useState(false);

	const [userInfoCalled, setUserInfoCalled] = useState(false);
	const getUserInfo = async (code) => {
		setUserInfoCalled(true);

		const { data } = await client.query({
			query: GET_USER_INFO,
			variables: {
				code: dataFromRow.agentCode,
			},
		});

		if (data.userById) {
			setEmail(data.userById.email);
			setActive(data.userById.active);
			setUserType(data.userById.typology);
		} else {
			setEmail(noEmailFoundLabel);
			setUserType(noTypeFoundLabel);
			setNoUserFound(true);
		}
	};

	if (editMode && !userInfoCalled) getUserInfo();

	const handleEmailChange = (event) => {
		setCalled(false);
		setEmail(event.target.value.toLowerCase());
	};

	const handlePasswordChange = (event) => {
		setCalled(false);
		setPassword(event.target.value);
	};

	const handleuserTypeChange = (event) => {
		setCalled(false);
		setUserType(event.target.value);
	};

	const formErrors = () => {
		if (
			agentName === "" ||
			phoneNO === "" ||
			commission === "" ||
			(newMode && email === "") ||
			(newMode && password === "") ||
			(newMode && userType === "")
		) {
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
					active: true
				}
			) {
				agentCode
			}
		}
	`;

	const CREATE_OR_UPDATE_USER = gql`
		mutation createOrUpdateUser(
			$code: String!
			$email: String!
			$pw: String
			$typology: Typology!
			$active: Boolean
		) {
			createOrUpdateUser(
				user: {
					code: $code
					email: $email
					pw: $pw
					typology: $typology
					active: $active
				}
			) {
				code
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

		const code = data.createOrUpdateAgent.agentCode;

		if (code) {
			const { data } = await client.mutate({
				mutation: CREATE_OR_UPDATE_USER,
				variables: {
					code: code,
					email: email,
					typology: userType,
					active: active,
				},
			});
			if (data.createOrUpdateUser.code) {
				setResult("edited");
				handleClickYes();
			} else {
				setResult("error");
			}
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

		const code = data.createOrUpdateAgent.agentCode;

		if (code) {
			const { data } = await client.mutate({
				mutation: CREATE_OR_UPDATE_USER,
				variables: {
					code: code,
					email: email,
					pw: password,
					typology: userType,
					active: true,
				},
			});
			if (data.createOrUpdateUser.code) {
				setResult("created");
				handleClickYes();
			} else {
				setResult("error");
			}
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
					{called && formErrors() && (
						<Stack spacing={2} sx={{ mb: 3 }}>
							<Alert severity="error">{requiredFieldLabel}</Alert>
						</Stack>
					)}

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
								autoComplete="name"
							/>
							<TextField
								id="workingArea"
								label={workingAreaLabel}
								variant="outlined"
								type="text"
								fullWidth
								value={workingArea}
								onChange={handleWorkingAreaChange}
								autoComplete="off"
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
								autoComplete="tel"
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
								InputProps={{ inputProps: { min: 0, max: 1, step: 0.01 } }}
								fullWidth
								required
								error={called && commission === ""}
								value={commission}
								onChange={handleCommissionChange}
							/>
						</Stack>
						<Divider />
						<Stack direction="row" spacing={2}>
							<TextField
								id="newEmail"
								label="Email"
								variant="outlined"
								type="email"
								error={called && email === ""}
								required
								fullWidth
								value={email}
								onChange={handleEmailChange}
								disabled={editMode}
							/>
							<FormControl fullWidth>
								<InputLabel id="userType" required>
									{userTypeLabel}
								</InputLabel>
								<Select
									labelId="userType"
									id="userType"
									value={userType}
									label={userTypeLabel}
									onChange={handleuserTypeChange}
									required
									fullWidth
									error={called && userType === ""}
									disabled={NoUserFound}
								>
									<MenuItem selected key="A" value="A">
										Agente
									</MenuItem>
									<MenuItem selected key="D" value="D">
										Dirigente
									</MenuItem>
									{editMode && NoUserFound && (
										<MenuItem key={noTypeFoundLabel} value={noTypeFoundLabel}>
											{noTypeFoundLabel}
										</MenuItem>
									)}
								</Select>
							</FormControl>
						</Stack>
						{newMode && (
							<Stack direction="row" spacing={2}>
								<TextField
									id="newPassword"
									label="Password"
									variant="outlined"
									type="password"
									error={called && password === ""}
									required
									fullWidth
									value={password}
									onChange={handlePasswordChange}
									inputProps={{
										autoComplete: "off",
										form: {
											autoComplete: "off",
										},
									}}
								/>
							</Stack>
						)}
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
