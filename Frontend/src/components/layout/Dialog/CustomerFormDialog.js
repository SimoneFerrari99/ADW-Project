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

	// const GET_CUSTOMER_INFO = gql`
	// 	query GetCustomerInfo($custCode: String!) {
	// 		customerById(custCode: $custCode) {
	// 			custCity
	// 			workingArea
	// 			custCountry
	// 			grade
	// 			openingAMT
	// 			receiveAMT
	// 			paymentAMT
	// 			outstandingAMT
	// 		}
	// 	}
	// `;

	// const { data, loading, error } = useQuery(GET_CUSTOMER_INFO, {
	// 	variables: {
	// 		custCode: dataFromRow.custCode,
	// 	},
	// });

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

	const [grade, setGrade] = useState((editMode && dataFromRow.grade) || "");

	const [openingAMT, setOpeningAMT] = useState(
		parseFloat(editMode && dataFromRow.openingAMT) || ""
	);

	const [receiveAMT, setReceiveAMT] = useState(
		parseFloat(editMode && dataFromRow.receiveAMT) || ""
	);

	const [paymentAMT, setPaymentAMT] = useState(
		parseFloat(editMode && dataFromRow.paymentAMT) || ""
	);

	const [outstandingAMT, setOutstandingAMT] = useState(
		parseFloat(editMode && dataFromRow.outstandingAMT) || ""
	);

	const [phoneNO, setPhoneNO] = useState(
		(editMode && dataFromRow.phoneNO) || ""
	);

	const [agentCode, setAgentCode] = useState(
		(editMode && dataFromRow.agent.agentCode) || ""
	);

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

	const handleClickEditConfirm = async (event) => {
		event.preventDefault();

		setCalled(true);
		if (formErrors()) return;

		const UPDATE_CUSTOMER = gql`
			mutation updateCustomerAllFields(
				$custCode: String!
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
				updateCustomerAllFields(
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
					}
				)
			}
		`;

		console.log(dataFromRow.custCode);
		console.log(agentCode);

		const { data } = await client.mutate({
			mutation: UPDATE_CUSTOMER,
			variables: {
				custCode: editMode && dataFromRow.custCode,
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

		if (data.updateCustomerAllFields) {
			setResult("edited");
			handleClickYes();
		} else {
			setResult("error");
		}
	};

	const handleClickNewOrderConfirm = async (event) => {
		// 	event.preventDefault();
		// 	setCalled(true);
		// 	if (formErrors()) return;
		// 	const CREATE_ORDER = gql`
		// 		mutation createOrder(
		// 			$ordAMT: Float!
		// 			$advanceAMT: Float!
		// 			$agentId: String!
		// 			$customerId: String!
		// 			$ordDescription: String!
		// 		) {
		// 			createOrder(
		// 				order: {
		// 					ordAMT: $ordAMT
		// 					advanceAMT: $advanceAMT
		// 					agentId: $agentId
		// 					customerId: $customerId
		// 					ordDescription: $ordDescription
		// 				}
		// 			) {
		// 				ordNum
		// 			}
		// 		}
		// 	`;
		// 	const { data } = await client.mutate({
		// 		mutation: CREATE_ORDER,
		// 		variables: {
		// 			ordAMT: ordAMT,
		// 			advanceAMT: advanceAMT,
		// 			agentId: agentCode,
		// 			customerId: custCode,
		// 			ordDescription: ordDescription,
		// 		},
		// 	});
		// 	if (data.createOrder.ordNum) {
		// 		setResult("created");
		// 		handleClickYes();
		// 	} else {
		// 		setResult("error");
		// 	}
	};

	const GET_AGENTS = gql`
		query getAgents {
			getAgents {
				agentCode
			}
		}
	`;

	const agentsQueryResults = useQuery(GET_AGENTS);

	return (
		<InfoDialog
			title={title}
			fullWidth={true}
			open={open}
			handleClose={handleClickNo}
			InfoDialogBody={
				<Box component="form" id="customerForm">
					<Stack spacing={2} sx={{ mb: 3 }}>
						{/* {called && ordAMT < advanceAMT && (
							<Alert severity="error">{ordAmountAdvancedAmountErrorLabel}</Alert>
						)} */}
						{called && formErrors() && (
							<Alert severity="error">{requiredFieldLabel}</Alert>
						)}
					</Stack>
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
								<InputLabel id="agentLabel">{agentCodeLabel}</InputLabel>
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
								(newMode && handleClickNewOrderConfirm)
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
