/* COMPONENTE PER LA TABELLA DEI CLIENTI ASSOCIATI ALL'AGENT */

import { Fragment, useState } from "react";
import { ReactSession } from "react-client-session";
import { gql, useQuery } from "@apollo/client";

import { Box, TableCell, Paper, TableRow } from "@mui/material";

import HomepageTableBody from "../../../components/layout/Table/HomepageTableBody";
import OpenPersonInfoDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenPersonInfoDialogButton";
import OpenEditCustomerDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenEditCustomerDialogButton";

import { getComparator } from "../../../utils/functions/sorting";
import {
	allCustomerTitleTable,
	customerTablePaginationLabel,
} from "../../../utils/strings";

/* Colonne della tabella */
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

/* Componente principale */
export default function AgentCustomersTable() {
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("ordNum");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	/* Query per recuperare i customers tramite agent code */
	const GET_CUSTOMERS = gql`
		query GetCustomersByAgentCode($agentCode: String!) {
			customersByAgentCode(agentCode: $agentCode) {
				custCode
				custName
				phoneNO
				custCity
				workingArea
				custCountry
				grade
				agent {
					agentCode
				}
				active
			}
		}
	`;

	const { data, loading, error, refetch } = useQuery(GET_CUSTOMERS, {
		variables: { agentCode: ReactSession.get("code") },
	});

	const rows = !loading && !error && data.customersByAgentCode;

	return (
		<Fragment>
			<Box sx={{ width: "100%", boxShadow: 4 }}>
				<Paper sx={{ width: "100%", mb: 2 }}>
					<HomepageTableBody
						tableTitle={allCustomerTitleTable}
						headerButtons={null}
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
												<OpenEditCustomerDialogButton
													data={row}
													refetch={refetch}
													agentMode
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
		</Fragment>
	);
}
