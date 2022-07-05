import { Fragment, useState } from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";

import { Box, TableCell, Paper, TableRow } from "@mui/material";

import { RestoreFromTrashRounded } from "@mui/icons-material";

import HomepageTableBody from "../../../components/layout/Table/HomepageTableBody";
import OpenPersonInfoDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenPersonInfoDialogButton";
import OpenConfirmationDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenConfirmationDialogButton";

import { getComparator } from "../../../utils/functions/sorting";
import {
	allCustomerTitleTable,
	customerTablePaginationLabel,
	confirmationRestoreTitle,
	confirmationRestoreText,
	cancelLabel,
	confirmRestoreLabel,
	RestoreCustomerSuccessSnackText,
	RestoreCustomerErrorSnackText,
	actionCancelledSnackText,
} from "../../../utils/strings";

import SnackMessage from "../../../components/layout/Snack/SnackMessage";

const headCells = [
	{
		id: "custCode",
		label: "Cliente",
	},
	{
		id: "custName",
		label: "Nome",
	},
	{
		id: "phoneNO",
		label: "Numero Telefono",
	},
	{
		id: "agent.agentCode",
		label: "Agente",
	},
	{
		id: "actions",
		label: "Azioni",
	},
];

export default function ManagerRestoreCustomersTable() {
	const client = useApolloClient();

	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("ordNum");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [restoreResult, setRestoreResult] = useState("");

	const GET_CUSTOMERS = gql`
		query GetCustomers {
			getCustomers {
				custCode
				custName
				phoneNO
				custCity
				workingArea
				custCountry
				grade
				openingAMT
				receiveAMT
				paymentAMT
				outstandingAMT
				agent {
					agentCode
					active
				}
				active
			}
		}
	`;

	const RESTORE_CUSTOMER = gql`
		mutation RestoreCustomer($custCode: String!) {
			restoreCustomer(custCode: $custCode)
		}
	`;

	const { data, loading, error, refetch } = useQuery(GET_CUSTOMERS);

	const rows = !loading && !error && data.getCustomers;

	return (
		<Fragment>
			<Box sx={{ width: "100%", boxShadow: 4 }}>
				<Paper sx={{ width: "100%", mb: 2 }}>
					<HomepageTableBody
						tableTitle={allCustomerTitleTable}
						headCells={headCells}
						loading={loading}
						error={error}
						rows={!loading && !error && rows.filter((row) => row.active === false)}
						tableRows={
							!loading &&
							!error &&
							rows
								.filter((row) => row.active === false)
								.slice()
								.sort(getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const labelId = `RigaCliente-${index}`;

									return (
										<TableRow hover tabIndex={-1} key={row.custCode}>
											<TableCell
												component="th"
												id={labelId}
												scope="row"
												padding="normal"
												align="center"
												sx={{ fontWeight: "bold" }}
											>
												{row.custCode}
											</TableCell>
											<TableCell align="center">{row.custName}</TableCell>
											<TableCell align="center">{row.phoneNO}</TableCell>
											<TableCell align="center">
												<OpenPersonInfoDialogButton agentCode={row.agent.agentCode} />
											</TableCell>
											<TableCell align="center">
												<OpenConfirmationDialogButton
													iconButton={<RestoreFromTrashRounded color="info" />}
													ariaLabel="restore cliente"
													confirmationTitle={confirmationRestoreTitle}
													confirmationText={confirmationRestoreText}
													handleConfirmation={async () => {
														const { data } = await client.mutate({
															mutation: RESTORE_CUSTOMER,
															variables: {
																custCode: row.custCode,
															},
														});
														if (row.agent.active) {
															if (data.restoreCustomer) {
																refetch();
															} else {
																setRestoreResult("error");
															}
														}
													}}
													noText={cancelLabel}
													yesText={confirmRestoreLabel}
													startIconYes={<RestoreFromTrashRounded />}
													setResult={setRestoreResult}
													yesColor="info"
												/>
											</TableCell>
										</TableRow>
									);
								})
						}
						tablePaginationLabel={customerTablePaginationLabel}
						order={order}
						orderBy={orderBy}
						page={page}
						rowsPerPage={rowsPerPage}
						setOrder={setOrder}
						setOrderBy={setOrderBy}
						setPage={setPage}
						setRowsPerPage={setRowsPerPage}
					/>
				</Paper>
			</Box>
			{restoreResult === "confirmed" && (
				<SnackMessage
					text={RestoreCustomerSuccessSnackText}
					variant="filled"
					severity="success"
					reset={setRestoreResult}
				/>
			)}
			{restoreResult === "cancelled" && (
				<SnackMessage
					text={actionCancelledSnackText}
					variant="filled"
					severity="warning"
					reset={setRestoreResult}
				/>
			)}
			{restoreResult === "error" && (
				<SnackMessage
					text={RestoreCustomerErrorSnackText}
					variant="filled"
					severity="info"
					reset={setRestoreResult}
				/>
			)}
		</Fragment>
	);
}
