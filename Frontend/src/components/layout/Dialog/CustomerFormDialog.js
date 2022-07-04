import { useState } from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";

import {
	Stack,
	Box,
	TextField,
	DialogActions,
	Button,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
	Alert,
	Divider,
} from "@mui/material";

import InfoDialog from "./InfoDialog";
import {
	custNameLabel,
	custCityLabel,
	workingAreaLabel,
	custCountryLabel,
	phoneNOLabel,
	gradeLabel,
	openingAMTLabel,
	receiveAMTLabel,
	paymentAMTLabel,
	outstandingAMTLabel,
	agentCodeLabel,
	requiredFieldLabel,
	userTypeLabel,
	noEmailFoundLabel,
	noTypeFoundLabel,
} from "../../../utils/strings";

export default function CustomerFormDialog({
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

	/* FORM FIELD */
	const [custName, setCustName] = useState(
		(editMode && dataFromRow.custName) || ""
	);

	const [custCity, setCustCity] = useState(
		(editMode && dataFromRow.custCity) || ""
	);

	const [workingArea, setWorkingArea] = useState(
		(editMode && dataFromRow.workingArea) || ""
	);

	const [custCountry, setCustCountry] = useState(
		(editMode && dataFromRow.custCountry) || ""
	);

	const [grade, setGrade] = useState((editMode && dataFromRow.grade) || 0);

	const [openingAMT, setOpeningAMT] = useState(
		parseFloat(editMode && dataFromRow.openingAMT) || 0
	);

	const [receiveAMT, setReceiveAMT] = useState(
		parseFloat(editMode && dataFromRow.receiveAMT) || 0
	);

	const [paymentAMT, setPaymentAMT] = useState(
		parseFloat(editMode && dataFromRow.paymentAMT) || 0
	);

	const [outstandingAMT, setOutstandingAMT] = useState(
		parseFloat(editMode && dataFromRow.outstandingAMT) || 0
	);

	const [phoneNO, setPhoneNO] = useState(
		(editMode && dataFromRow.phoneNO) || ""
	);

	const [agentCode, setAgentCode] = useState(
		(editMode && dataFromRow.agent.agentCode) || ""
	);

	/* FORM FIELD HANDLER */
	const handleCustNameChange = (event) => {
		setCalled(false);
		setCustName(event.target.value);
	};

	const handleCustCityChange = (event) => {
		setCalled(false);
		setCustCity(event.target.value);
	};

	const handleWorkingAreaChange = (event) => {
		setCalled(false);
		setWorkingArea(event.target.value);
	};

	const handleCustCountryChange = (event) => {
		setCalled(false);
		setCustCountry(event.target.value);
	};

	const handleGradeChange = (event) => {
		setCalled(false);
		setGrade(event.target.value);
	};

	const handleOpeningAMTChange = (event) => {
		setCalled(false);
		setOpeningAMT(parseFloat(event.target.value));
	};

	const handleReceiveAMTChange = (event) => {
		setCalled(false);
		setReceiveAMT(parseFloat(event.target.value));
	};

	const handlePaymentAMTChange = (event) => {
		setCalled(false);
		setPaymentAMT(parseFloat(event.target.value));
	};

	const handleOutstandingAMTChange = (event) => {
		setCalled(false);
		setOutstandingAMT(parseFloat(event.target.value));
	};

	const handlePhoneNOChange = (event) => {
		setCalled(false);
		setPhoneNO(event.target.value);
	};

	const handleAgentCodeChange = (event) => {
		setCalled(false);
		setAgentCode(event.target.value);
	};

	const GET_AGENTS = gql`
		query getAgents {
			getAgents {
				agentCode
			}
		}
	`;

	const agentsQueryResults = useQuery(GET_AGENTS);

	/* FORM FIELD USER CREDENTIALS */

	const GET_USER_INFO = gql`
		query getUserInfo($code: String!) {
			userById(code: $code) {
				email
				typology
			}
		}
	`;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState("C");

	const [userInfoCalled, setUserInfoCalled] = useState(false);
	const getUserInfo = async (code) => {
		setUserInfoCalled(true);

		const { data } = await client.query({
			query: GET_USER_INFO,
			variables: {
				code: dataFromRow.custCode,
			},
		});

		if (data.userById) {
			setEmail(data.userById.email);
			setUserType(data.userById.typology);
		} else {
			setEmail(noEmailFoundLabel);
			setUserType(noTypeFoundLabel);
		}
	};

	if (editMode && !userInfoCalled) getUserInfo();

	const handleEmailChange = (event) => {
		setCalled(false);
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setCalled(false);
		setPassword(event.target.value);
	};

	const handleuserTypeChange = (event) => {
		setCalled(false);
		setUserType(event.target.value);
	};

	/* EXECUTION OF EDIT/NEW */

	const formErrors = () => {
		if (
			custName === "" ||
			workingArea === "" ||
			custCountry === "" ||
			openingAMT === "" ||
			receiveAMT === "" ||
			paymentAMT === "" ||
			outstandingAMT === "" ||
			phoneNO === "" ||
			agentCode === ""
		) {
			return true;
		} else {
			return false;
		}
	};

	const CREATE_OR_UPDATE_CUSTOMER = gql`
		mutation createOrUpdateCustomer(
			$custCode: String
			$custName: String!
			$custCity: String
			$workingArea: String!
			$custCountry: String!
			$grade: Int
			$openingAMT: Float!
			$receiveAMT: Float!
			$paymentAMT: Float!
			$outstandingAMT: Float!
			$phoneNO: String!
			$agentCode: String!
		) {
			createOrUpdateCustomer(
				custCode: $custCode
				customer: {
					custName: $custName
					custCity: $custCity
					workingArea: $workingArea
					custCountry: $custCountry
					grade: $grade
					openingAMT: $openingAMT
					receiveAMT: $receiveAMT
					paymentAMT: $paymentAMT
					outstandingAMT: $outstandingAMT
					phoneNO: $phoneNO
					agentCode: $agentCode
					active: true
				}
			) {
				custCode
			}
		}
	`;

	const CREATE_USER = gql`
		mutation createUser(
			$code: String!
			$email: String!
			$pw: String!
			$typology: Typology!
			$active: Boolean!
		) {
			createUser(
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
			mutation: CREATE_OR_UPDATE_CUSTOMER,
			variables: {
				custCode: dataFromRow.custCode,
				custName: custName,
				custCity: custCity,
				workingArea: workingArea,
				custCountry: custCountry,
				grade: grade,
				openingAMT: openingAMT,
				receiveAMT: receiveAMT,
				paymentAMT: paymentAMT,
				outstandingAMT: outstandingAMT,
				phoneNO: phoneNO,
				agentCode: agentCode,
			},
		});

		if (data.createOrUpdateCustomer.custCode) {
			setResult("edited");
			handleClickYes();
		} else {
			setResult("error");
		}
	};

	const handleClickNewCustomerConfirm = async (event) => {
		event.preventDefault();
		setCalled(true);
		if (formErrors()) return;

		const { data } = await client.mutate({
			mutation: CREATE_OR_UPDATE_CUSTOMER,
			variables: {
				custCode: null,
				custName: custName,
				custCity: custCity,
				workingArea: workingArea,
				custCountry: custCountry,
				grade: grade,
				openingAMT: openingAMT,
				receiveAMT: receiveAMT,
				paymentAMT: paymentAMT,
				outstandingAMT: outstandingAMT,
				phoneNO: phoneNO,
				agentCode: agentCode,
			},
		});

		const code = data.createOrUpdateCustomer.custCode;

		if (code) {
			const { data } = await client.mutate({
				mutation: CREATE_USER,
				variables: {
					code: code,
					email: email,
					pw: password,
					typology: userType,
					active: true,
				},
			});
			if (data.createUser.code) {
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
				<Box component="form" id="customerForm">
					{called && formErrors() && (
						<Stack spacing={2} sx={{ mb: 3 }}>
							<Alert severity="error">{requiredFieldLabel}</Alert>
						</Stack>
					)}

					<Stack spacing={2}>
						<Stack direction="row" spacing={2}>
							<TextField
								id="custName"
								label={custNameLabel}
								variant="outlined"
								type="text"
								error={called && custName === ""}
								required
								fullWidth
								autoFocus
								value={custName}
								onChange={handleCustNameChange}
							/>
							<TextField
								id="custCity"
								label={custCityLabel}
								variant="outlined"
								type="text"
								fullWidth
								value={custCity}
								onChange={handleCustCityChange}
							/>
						</Stack>

						<Stack direction="row" spacing={2}>
							<TextField
								id="workingArea"
								label={workingAreaLabel}
								variant="outlined"
								type="text"
								error={called && workingArea === ""}
								required
								fullWidth
								value={workingArea}
								onChange={handleWorkingAreaChange}
							/>
							<TextField
								id="custCountry"
								label={custCountryLabel}
								variant="outlined"
								type="text"
								error={called && custCountry === ""}
								required
								fullWidth
								value={custCountry}
								onChange={handleCustCountryChange}
							/>
						</Stack>

						<Stack direction="row" spacing={2}>
							<TextField
								id="phoneNO"
								label={phoneNOLabel}
								variant="outlined"
								type="text"
								error={called && phoneNO === ""}
								required
								fullWidth
								value={phoneNO}
								onChange={handlePhoneNOChange}
							/>
							<TextField
								id="grade"
								label={gradeLabel}
								variant="outlined"
								type="number"
								fullWidth
								InputProps={{ inputProps: { min: 0, max: 10 } }}
								value={grade}
								onChange={handleGradeChange}
							/>
						</Stack>

						<Stack direction="row" spacing={2}>
							<TextField
								id="openingAMT"
								label={openingAMTLabel}
								variant="outlined"
								type="number"
								error={called && openingAMT === ""}
								required
								fullWidth
								value={openingAMT}
								onChange={handleOpeningAMTChange}
							/>
							<TextField
								id="receiveAMT"
								label={receiveAMTLabel}
								variant="outlined"
								type="number"
								error={called && receiveAMT === ""}
								required
								fullWidth
								value={receiveAMT}
								onChange={handleReceiveAMTChange}
							/>
						</Stack>

						<Stack direction="row" spacing={2}>
							<TextField
								id="paymentAMT"
								label={paymentAMTLabel}
								variant="outlined"
								type="number"
								error={called && paymentAMT === ""}
								required
								fullWidth
								value={paymentAMT}
								onChange={handlePaymentAMTChange}
							/>
							<TextField
								id="outstandingAMT"
								label={outstandingAMTLabel}
								variant="outlined"
								type="number"
								error={called && outstandingAMT === ""}
								required
								fullWidth
								value={outstandingAMT}
								onChange={handleOutstandingAMTChange}
							/>
						</Stack>

						<Stack direction="row" spacing={2}>
							<FormControl fullWidth>
								<InputLabel id="agentLabel" required>
									{agentCodeLabel}
								</InputLabel>
								<Select
									labelId="agentLabel"
									id="agent"
									value={agentCode}
									label={agentCodeLabel}
									onChange={handleAgentCodeChange}
									required
									fullWidth
									error={called && agentCode === ""}
								>
									{!agentsQueryResults.loading &&
										!agentsQueryResults.error &&
										agentsQueryResults.data.getAgents.map((agent) => (
											<MenuItem key={agent.agentCode} value={agent.agentCode}>
												{agent.agentCode}
											</MenuItem>
										))}
								</Select>
							</FormControl>
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
									disabled={editMode}
								>
									<MenuItem selected key="C" value="C">
										Cliente
									</MenuItem>
									{editMode && (
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
							form="customerForm"
							onClick={
								(editMode && handleClickEditConfirm) ||
								(newMode && handleClickNewCustomerConfirm)
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
