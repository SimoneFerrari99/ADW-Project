import { Fragment, useState } from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";

import { Box, TableCell, Paper, TableRow } from "@mui/material";

import { DeleteRounded } from "@mui/icons-material";

import HomepageTableBody from "../../../components/layout/Table/HomepageTableBody";
import OpenPersonInfoDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenPersonInfoDialogButton";
import OpenEditAgentDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenEditAgentDialogButton";
import OpenNewAgentDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenNewAgentDialogButton";
import OpenConfirmationDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenConfirmationDialogButton";

import { getComparator } from "../../../utils/functions/sorting";
import {
	allAgentTitleTable,
	customerTablePaginationLabel,
	confirmationDeleteTitle,
	confirmationDeleteText,
	cancelLabel,
	confirmDeleteLabel,
	deleteAgentSuccessSnackText,
	deleteAgentErrorSnackText,
	actionCancelledSnackText,
} from "../../../utils/strings";

import SnackMessage from "../../../components/layout/Snack/SnackMessage";

const headCells = [
	{
		id: "agentCode",
		label: "Agente",
	},
	{
		id: "agentName",
		label: "Nome",
	},
	{
		id: "phoneNO",
		label: "Numero Telefono",
	},
	{
		id: "commission",
		label: "Commissione",
	},
	{
		id: "actions",
		label: "Azioni",
	},
];

export default function ManagerAgentsTable() {
	const client = useApolloClient();

	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("agentCode");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [deleteResult, setDeleteResult] = useState("");

	const GET_AGENTS = gql`
		query GetAgents {
			getAgents {
				agentCode
				agentName
				workingArea
				commission
				phoneNO
				country
				active
			}
		}
	`;

	const DELETE_AGENT = gql`
		mutation DeleteAgent($agentCode: String!) {
			deleteAgent(agentCode: $agentCode)
		}
	`;

	const { data, loading, error, refetch } = useQuery(GET_AGENTS);

	const rows = !loading && !error && data.getAgents;

	return (
		<Fragment>
			<Box sx={{ width: "100%", boxShadow: 4 }}>
				<Paper sx={{ width: "100%", mb: 2 }}>
					<HomepageTableBody
						tableTitle={allAgentTitleTable}
						headerButtons={<OpenNewAgentDialogButton refetch={refetch} />}
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
										<TableRow hover tabIndex={-1} key={row.agentCode}>
											<TableCell
												component="th"
												id={labelId}
												scope="row"
												padding="normal"
												align="center"
												sx={{ fontWeight: "bold" }}
											>
												{row.agentCode}
											</TableCell>
											<TableCell align="center">{row.agentName}</TableCell>
											<TableCell align="center">{row.phoneNO}</TableCell>
											<TableCell align="center">{row.commission}</TableCell>
											<TableCell align="center">
												<Box sx={{ display: "flex" }}>
													<OpenEditAgentDialogButton data={row} refetch={refetch} />
													<OpenConfirmationDialogButton
														iconButton={<DeleteRounded color="error" />}
														ariaLabel="elimina agente"
														confirmationTitle={confirmationDeleteTitle}
														confirmationText={confirmationDeleteText}
														handleConfirmation={async () => {
															const { data } = await client.mutate({
																mutation: DELETE_AGENT,
																variables: {
																	agentCode: row.agentCode,
																},
															});
															if (data.deleteAgent) {
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
					text={deleteAgentSuccessSnackText}
					variant="filled"
					severity="success"
				/>
			)}
			{deleteResult === "cancelled" && (
				<SnackMessage
					text={actionCancelledSnackText}
					variant="filled"
					severity="warning"
				/>
			)}
			{deleteResult === "error" && (
				<SnackMessage
					text={deleteAgentErrorSnackText}
					variant="filled"
					severity="error"
				/>
			)}
		</Fragment>
	);
}
