import * as React from "react";
import { useQuery, gql } from "@apollo/client";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { visuallyHidden } from "@mui/utils";
import Skeleton from "@mui/material/Skeleton";
import LoadingError from "../UtilsComponents/LoadingError";
import PersonInfoDialog from "../DialogComponents/PersonInfoDialog";

const customerOrders = gql`
	query GetOrdersByCustomerId {
		ordersByCustomerCustCode(custCode: "C00008") {
			ordNum
			ordAMT
			ordDate
			agent {
				agentCode
			}
			ordDescription
		}
	}
`;

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
	return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
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

function CustomTableHead({ order, orderBy, onRequestSort }) {
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align="center"
						padding="normal"
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{ fontWeight: "bold", fontSize: "1rem" }}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "Ordine decrescente" : "Ordine crescente"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

const CustomTableToolbar = () => {
	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
			}}
		>
			<Typography sx={{ flex: "1 1 100%", fontWeight: "bold" }} variant="h5" id="tableTitle" component="div">
				I miei ordini
			</Typography>
		</Toolbar>
	);
};

export default function CustomTable() {
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("ordNum");
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
		return error ? <LoadingError /> : <Skeleton variant="rectangular" animation="wave" width={"100%"} height={200} sx={{ borderRadius: 2 }} />;
	}
	const rows = data.ordersByCustomerCustCode;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box sx={{ width: "100%", boxShadow: 4 }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<CustomTableToolbar />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
						<CustomTableHead
							headCells={headCells}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
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
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 50]}
					labelRowsPerPage={"Ordini per pagina"}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
