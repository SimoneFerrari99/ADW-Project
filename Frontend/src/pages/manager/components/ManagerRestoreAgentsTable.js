import { Fragment, useState } from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";

import { Box, TableCell, Paper, TableRow } from "@mui/material";

import { RestoreFromTrashRounded } from "@mui/icons-material";

import HomepageTableBody from "../../../components/layout/Table/HomepageTableBody";
import OpenPersonInfoDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenPersonInfoDialogButton";
import OpenEditAgentDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenEditAgentDialogButton";
import OpenNewAgentDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenNewAgentDialogButton";
import OpenConfirmationDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenConfirmationDialogButton";

import { getComparator } from "../../../utils/functions/sorting";
import {
	allAgentTitleTable,
	customerTablePaginationLabel,
	confirmationRestoreTitle,
	confirmationRestoreText,
	cancelLabel,
	confirmRestoreLabel,
	RestoreAgentSuccessSnackText,
	RestoreAgentErrorSnackText,
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

export default function ManagerRestoreAgentsTable() {
	const client = useApolloClient();

	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("agentCode");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [restoreResult, setRestoreResult] = useState("");

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

	const RESTORE_AGENT = gql`
		mutation RestoreAgent($agentCode: String!) {
			restoreAgent(agentCode: $agentCode)
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
												<OpenConfirmationDialogButton
													iconButton={<RestoreFromTrashRounded color="info" />}
													ariaLabel="ripristina agente"
													confirmationTitle={confirmationRestoreTitle}
													confirmationText={confirmationRestoreText}
													handleConfirmation={async () => {
														const { data } = await client.mutate({
															mutation: RESTORE_AGENT,
															variables: {
																agentCode: row.agentCode,
															},
														});
														if (data.restoreAgent) {
															refetch();
														} else {
															setRestoreResult("error");
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
					text={RestoreAgentSuccessSnackText}
					variant="filled"
					severity="success"
					reset={setRestoreResult}
				/>
			)}
			{restoreResult === "cancelled" && (
				<SnackMessage
					text={actionCancelledSnackText}
					variant="outlined"
					severity="warning"
					reset={setRestoreResult}
				/>
			)}
			{restoreResult === "error" && (
				<SnackMessage
					text={RestoreAgentErrorSnackText}
					variant="filled"
					severity="error"
					reset={setRestoreResult}
				/>
			)}
		</Fragment>
	);
}
