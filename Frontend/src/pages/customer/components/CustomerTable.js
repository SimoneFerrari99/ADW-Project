import { useQuery } from "@apollo/client";
import { Fragment, useState } from "react";

import { Box, TableCell } from "@mui/material";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import TableRow from "@mui/material/TableRow";
import PersonInfoDialog from "../../../components/layout/DialogComponents/PersonInfoDialog";
import LoadingError from "../../../components/layout/UtilsComponents/LoadingError";
import CustomTable from "../../../components/layout/CustomerTableComponents/CustomTable";

import { customerOrders } from "../graphql/customerOrders";

function descendingComparator(a, b, orderBy) {
	const myArray = orderBy.split(".");
	for (let i = 0; i < myArray.length; i++) {
		b = b[myArray[i]];
		a = a[myArray[i]];
	}

	if (b < a) {
		return -1;
	}
	if (b > a) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
	{
		id: "ordNum",
		label: "Numero Ordine",
	},
	{
		id: "ordAMT",
		label: "Totale ordine",
	},
	{
		id: "ordDate",
		label: "Data ordine",
	},
	{
		id: "agent.agentCode",
		label: "Agente",
	},
	{
		id: "ordDescription",
		label: "Descrizione",
	},
];

export default function CustomerTable() {
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("ordNum");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

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

	const { data, loading, error } = useQuery(customerOrders);

	if (loading) {
		return error ? (
			<LoadingError />
		) : (
			<Skeleton
				variant="rectangular"
				animation="wave"
				width={"100%"}
				height={200}
				sx={{ borderRadius: 2 }}
			/>
		);
	}
	const rows = data.ordersByCustomerCustCode;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box sx={{ width: "100%", boxShadow: 4 }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<CustomTable
					title={"I miei ordini"}
					headCells={headCells}
					order={order}
					orderBy={orderBy}
					handleRequestSort={handleRequestSort}
					rows={rows}
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
												<PersonInfoDialog codeToShow={row.agent.agentCode} />
											</TableCell>
											<TableCell align="center">{row.ordDescription}</TableCell>
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
					paginationLabel={"Ordini per pagina"}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				></CustomTable>
			</Paper>
		</Box>
	);
}
