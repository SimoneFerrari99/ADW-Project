import { Fragment, useState } from "react";
import { ReactSession } from "react-client-session";
import { gql, useQuery } from "@apollo/client";

import {
	Box,
	TableCell,
	Paper,
	Skeleton,
	TableRow,
	IconButton,
	Button,
} from "@mui/material";

import { EditRounded, DeleteRounded, AddRounded } from "@mui/icons-material";

import OpenPersonInfoDialogButton from "../../../components/layout/Dialog/OpenPersonInfoDialogButton";
import LoadingError from "../../../components/layout/Error/LoadingError";
import HomepageTable from "../../../components/layout/Table/HomepageTable";

import { getComparator } from "../../../utils/functions/sorting";
import {
	connectionError,
	customerTitleTable,
	customerTablePaginationLabel,
} from "../../../utils/strings";

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
		id: "customer.customerCode",
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
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("ordNum");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	// const agentOrders = gql`
	// 	query GetOrdersByAgentId {
	// 		ordersByAgentAgentCode(agentCode: "${ReactSession.get("code")}") {
	// 			ordNum
	// 			ordAMT
	// 			ordDate
	// 			agent {
	// 				agentCode
	// 			}
	// 			ordDescription
	// 		}
	// 	}
	// `;

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// const { data, loading, error } = useQuery("agentOrders");
	const data = {
		ordersByAgentAgentCode: [
			{
				__typename: "Order",
				ordNum: 200101,
				ordAMT: 3000,
				ordDate: "2008-07-15",
				customer: {
					__typename: "Agent",
					custCode: "C00014",
				},
				ordDescription: "SOD",
			},
		],
	};
	const loading = false;
	const error = false;

	if (loading) {
		return (
			<Skeleton
				variant="rectangular"
				animation="wave"
				width={"100%"}
				height={200}
				sx={{ borderRadius: 2 }}
			/>
		);
	}

	if (error) {
		return (
			<Box sx={{ width: "100%", boxShadow: 4 }}>
				<Paper sx={{ width: "100%", mb: 2 }}>
					<LoadingError text={connectionError} severity="error" variant="filled" />{" "}
				</Paper>
			</Box>
		);
	}

	const rows = data.ordersByAgentAgentCode;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box sx={{ width: "100%", boxShadow: 4 }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<HomepageTable
					title={customerTitleTable}
					headCells={headCells}
					order={order}
					orderBy={orderBy}
					handleRequestSort={handleRequestSort}
					rows={rows}
					headerButtons={
						<Button variant="contained" color="success" startIcon={<AddRounded />}>
							Nuovo ordine
						</Button>
					}
					tableBody={
						<Fragment>
							{rows
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
													<IconButton aria-label="delete">
														<EditRounded color="primary" />
													</IconButton>
													<IconButton aria-label="delete">
														<DeleteRounded color="error" />
													</IconButton>
												</Box>
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</Fragment>
					}
					paginationLabel={customerTablePaginationLabel}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				></HomepageTable>
			</Paper>
		</Box>
	);
}
