import { useState } from "react";
import { ReactSession } from "react-client-session";
import { gql, useQuery, useApolloClient } from "@apollo/client";

import { Box, TableCell, Paper, TableRow, Button } from "@mui/material";

import { DeleteRounded, AddRounded } from "@mui/icons-material";

import HomepageTableBody from "../../../components/layout/Table/HomepageTableBody";
import OpenPersonInfoDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenPersonInfoDialogButton";
import OpenConfirmationDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenConfirmationDialogButton";

import { getComparator } from "../../../utils/functions/sorting";
import {
	customerTitleTable,
	customerTablePaginationLabel,
	confirmationDeleteTitle,
	confirmationDeleteText,
	cancelLabel,
	confirmDeleteLabel,
} from "../../../utils/strings";
import OpenEditOrderDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenEditOrderDialogButton";

const headCells = [
	{
		id: "ordNum",
		label: "Ordine",
	},
	{
		id: "ordAMT",
		label: "Totale",
	},
	{
		id: "ordDate",
		label: "Data",
	},
	{
		id: "customer.custCode",
		label: "Cliente",
	},
	{
		id: "ordDescription",
		label: "Descrizione",
	},
	{
		id: "actions",
		label: "Azioni",
	},
];

export default function AgentTable() {
	const client = useApolloClient();

	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("ordNum");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const agentOrders = gql`
		query GetOrdersByAgentId($agentCode: String!) {
			ordersByAgentAgentCode(agentCode: $agentCode) {
				ordNum
				ordAMT
				ordDate
				customer {
					custCode
				}
				ordDescription
			}
		}
	`;

	const deleteOrder = gql`
		mutation DeleteOrder($ordNum: Int!) {
			deleteOrder(ordNum: $ordNum)
		}
	`;

	const { data, loading, error, refetch } = useQuery(agentOrders, {
		variables: {
			agentCode: ReactSession.get("code"),
		},
	});

	const rows = !loading && !error && data.ordersByAgentAgentCode;

	return (
		<Box sx={{ width: "100%", boxShadow: 4 }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<HomepageTableBody
					tableTitle={customerTitleTable}
					headerButtons={
						<Button variant="contained" color="success" startIcon={<AddRounded />}>
							Nuovo ordine
						</Button>
					}
					headCells={headCells}
					loading={loading}
					error={error}
					rows={rows}
					tableRows={
						!loading &&
						!error &&
						rows
							.slice()
							.sort(getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								const labelId = `RigaOrdine-${index}`;

								return (
									<TableRow hover tabIndex={-1} key={row.ordNum}>
										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="normal"
											align="center"
											sx={{ fontWeight: "bold" }}
										>
											{row.ordNum}
										</TableCell>
										<TableCell align="center">{row.ordAMT}</TableCell>
										<TableCell align="center">{row.ordDate}</TableCell>
										<TableCell align="center">
											<OpenPersonInfoDialogButton custCode={row.customer.custCode} />
										</TableCell>
										<TableCell align="center">{row.ordDescription}</TableCell>
										<TableCell align="center">
											<Box sx={{ display: "flex" }}>
												<OpenEditOrderDialogButton />
												<OpenConfirmationDialogButton
													iconButton={<DeleteRounded color="error" />}
													ariaLabel="elimina"
													confirmationTitle={confirmationDeleteTitle}
													confirmationText={confirmationDeleteText}
													handleConfirmation={async () => {
														await client.mutate({
															mutation: deleteOrder,
															variables: {
																ordNum: row.ordNum,
															},
														});
														refetch();
													}}
													noText={cancelLabel}
													yesText={confirmDeleteLabel}
													startIconYes={<DeleteRounded />}
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
	);
}
