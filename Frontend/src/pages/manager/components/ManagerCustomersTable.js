import { Fragment, useState } from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";

import { Box, TableCell, Paper, TableRow } from "@mui/material";

import { DeleteRounded } from "@mui/icons-material";

import HomepageTableBody from "../../../components/layout/Table/HomepageTableBody";
import OpenPersonInfoDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenPersonInfoDialogButton";
import OpenEditCustomerDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenEditCustomerDialogButton";
import OpenNewCustomerDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenNewCustomerDialogButton";
import OpenConfirmationDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenConfirmationDialogButton";

import { getComparator } from "../../../utils/functions/sorting";
import {
	allCustomerTitleTable,
	customerTablePaginationLabel,
	confirmationDeleteTitle,
	confirmationDeleteText,
	cancelLabel,
	confirmDeleteLabel,
	deleteCustomerSuccessSnackText,
	deleteCustomerErrorSnackText,
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

export default function ManagerCustomersTable() {
	const client = useApolloClient();

	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("ordNum");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [deleteResult, setDeleteResult] = useState("");

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
				}
				active
			}
		}
	`;

	const DELETE_CUSTOMER = gql`
		mutation DeleteCustomer($custCode: String!) {
			deleteCustomer(custCode: $custCode)
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
						headerButtons={<OpenNewCustomerDialogButton refetch={refetch} />}
						headCells={headCells}
						loading={loading}
						error={error}
						rows={!loading && !error && rows.filter((row) => row.active === true)}
						tableRows={
							!loading &&
							!error &&
							rows
								.filter((row) => row.active === true)
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
												<Box sx={{ display: "flex" }}>
													<OpenEditCustomerDialogButton data={row} refetch={refetch} />
													<OpenConfirmationDialogButton
														iconButton={<DeleteRounded color="error" />}
														ariaLabel="elimina cliente"
														confirmationTitle={confirmationDeleteTitle}
														confirmationText={confirmationDeleteText}
														handleConfirmation={async () => {
															const { data } = await client.mutate({
																mutation: DELETE_CUSTOMER,
																variables: {
																	custCode: row.custCode,
																},
															});
															if (data.deleteCustomer) {
																refetch();
															} else {
																setDeleteResult("error");
															}
														}}
														noText={cancelLabel}
														yesText={confirmDeleteLabel}
														startIconYes={<DeleteRounded />}
														setResult={setDeleteResult}
													/>
												</Box>
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
			{deleteResult === "confirmed" && (
				<SnackMessage
					text={deleteCustomerSuccessSnackText}
					variant="filled"
					severity="success"
				/>
			)}
			{deleteResult === "cancelled" && (
				<SnackMessage
					text={actionCancelledSnackText}
					variant="outlined"
					severity="warning"
				/>
			)}
			{deleteResult === "error" && (
				<SnackMessage
					text={deleteCustomerErrorSnackText}
					variant="filled"
					severity="error"
				/>
			)}
		</Fragment>
	);
}
