import { useState } from "react";
import { ReactSession } from "react-client-session";
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
	advanceAmountLabel,
	agentCodeLabel,
	custCodeLabel,
	ordAmountAdvancedAmountErrorLabel,
	ordAmountLabel,
	ordDescriptionLabel,
	requiredFieldLabel,
} from "../../../utils/strings";

export default function OrderFormDialog({
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
}) {
	const client = useApolloClient();
	const [called, setCalled] = useState(false);

	const [ordAMT, setOrdAMT] = useState((editMode && dataFromRow.ordAMT) || "");
	const [advanceAMT, setAdvanceAMT] = useState(
		(editMode && dataFromRow.advanceAMT) || ""
	);
	const [custCode, setCustCode] = useState(
		(editMode && dataFromRow.customer.custCode) || ""
	);
	const [agentCode, setAgentCode] = useState(
		(editMode && dataFromRow.agent.agentCode) ||
			(newMode && ReactSession.get("code"))
	);
	const [ordDescription, setOrdDescription] = useState(
		(editMode && dataFromRow.ordDescription) || ""
	);

	const handleOrdAmountChange = (event) => {
		setCalled(false);
		setOrdAMT(event.target.value);
	};

	const handleAdvanceAmountChange = (event) => {
		setCalled(false);
		setAdvanceAMT(event.target.value);
	};

	const handleCustCodeChange = (event) => {
		setCalled(false);
		setCustCode(event.target.value);
	};

	const handleAgentCodeChange = (event) => {
		setCalled(false);
		setAgentCode(event.target.value);
	};

	const handleOrdDescriptionChange = (event) => {
		setCalled(false);
		setOrdDescription(event.target.value);
	};

	const formErrors = () => {
		if (
			ordAMT === "" ||
			advanceAMT === "" ||
			custCode === "" ||
			agentCode === "" ||
			ordDescription === "" ||
			ordAMT < advanceAMT
		) {
			return true;
		} else {
			return false;
		}
	};

	const handleClickEditConfirm = (event) => {
		event.preventDefault();

		setCalled(true);

		// TODO query che salva le modifiche

		// const { data } = await client.mutate({
		// 	mutation: updatePsw,
		// 	variables: {
		// 		code: ReactSession.get("code"),
		// 		password: newPassword1,
		// 	},
		// });

		handleClickYes();
	};

	const handleClickNewOrderConfirm = async (event) => {
		event.preventDefault();

		setCalled(true);
		if (formErrors()) return;

		const CREATE_ORDER = gql`
			mutation createOrder(
				$ordAMT: Float!
				$advanceAMT: Float!
				$agentId: String!
				$customerId: String!
				$ordDescription: String!
			) {
				createOrder(
					order: {
						ordAMT: $ordAMT
						advanceAMT: $advanceAMT
						agentId: $agentId
						customerId: $customerId
						ordDescription: $ordDescription
					}
				) {
					ordNum
				}
			}
		`;

		const { data } = await client.mutate({
			mutation: CREATE_ORDER,
			variables: {
				ordAMT: ordAMT,
				advanceAMT: advanceAMT,
				agentId: agentCode,
				customerId: custCode,
				ordDescription: ordDescription,
			},
		});

		handleClickYes();
	};

	const GET_CUSTOMERS_BY_AGENTCODE = gql`
		query getCustomersByAgentCode($agentCode: String!) {
			customersByAgentCode(agentCode: $agentCode) {
				custCode
			}
		}
	`;

	const { data, loading, error } = useQuery(GET_CUSTOMERS_BY_AGENTCODE, {
		variables: { agentCode: agentCode },
	});

	return (
		<InfoDialog
			title={title}
			fullWidth={true}
			open={open}
			handleClose={handleClickNo}
			InfoDialogBody={
				<Box component="form" id="orderForm">
					<Stack spacing={2} sx={{ mb: 3 }}>
						{called && ordAMT < advanceAMT && (
							<Alert severity="error">{ordAmountAdvancedAmountErrorLabel}</Alert>
						)}
						{called && formErrors() && !(ordAMT < advanceAMT) && (
							<Alert severity="error">{requiredFieldLabel}</Alert>
						)}
					</Stack>
					<Stack spacing={2}>
						<Stack direction="row" spacing={2}>
							<TextField
								id="ordAmount"
								label={ordAmountLabel}
								variant="outlined"
								type="number"
								error={called && (ordAMT === "" || ordAMT < advanceAMT)}
								required
								fullWidth
								autoFocus
								value={ordAMT}
								onChange={handleOrdAmountChange}
							/>
							<TextField
								id="advanceAmount"
								label={advanceAmountLabel}
								variant="outlined"
								type="number"
								error={called && (advanceAMT === "" || ordAMT < advanceAMT)}
								required
								fullWidth
								value={advanceAMT}
								onChange={handleAdvanceAmountChange}
							/>
						</Stack>

						<Stack direction="row" spacing={2}>
							<FormControl fullWidth>
								<InputLabel id="customerLabel">{custCodeLabel}</InputLabel>
								<Select
									labelId="customerLabel"
									id="customer"
									value={custCode}
									label={custCodeLabel}
									onChange={handleCustCodeChange}
									fullWidth
									error={called && custCode === ""}
								>
									{!loading &&
										!error &&
										data.customersByAgentCode.map((customer) => (
											<MenuItem key={customer.custCode} value={customer.custCode}>
												{customer.custCode}
											</MenuItem>
										))}
								</Select>
							</FormControl>
							<FormControl fullWidth>
								<InputLabel id="agentLabel">{agentCodeLabel}</InputLabel>
								<Select
									labelId="agentLabel"
									id="agent"
									value={agentCode}
									label={agentCodeLabel}
									onChange={handleCustCodeChange}
									required
									disabled
									fullWidth
									error={called && agentCode === ""}
								>
									<MenuItem value={agentCode}>{agentCode}</MenuItem>
								</Select>
							</FormControl>
						</Stack>
						<Stack>
							<TextField
								id="ordDescription"
								label={ordDescriptionLabel}
								variant="outlined"
								type="text"
								error={called && ordDescription === ""}
								required
								fullWidth
								value={ordDescription}
								onChange={handleOrdDescriptionChange}
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
							form="orderForm"
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
