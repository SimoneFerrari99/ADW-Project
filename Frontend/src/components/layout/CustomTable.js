/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES IMPORT */
import * as React from "react";
import { useQuery, gql } from "@apollo/client";

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS IMPORT */
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

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GRAPHQL QUERY */
const customerOrders = gql`
	query GetOrdersByCustomerId {
		ordersByCustomerId(custCode: "C00001") {
			openingAMT
			receiveAMT
			paymentAMT
			outstandingAMT
		}
	}
`;

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENT */
function createData(ordNum, ordAMT, ordDate, agent, description) {
	return {
		ordNum,
		ordAMT,
		ordDate,
		agent,
		description,
	};
}

const rows = [
	createData(1, 305, "24-06-2022", "Nome Cognome A001", "Descrizione dell'ordine"),
	createData(2, 452, "24-06-2022", "Nome Cognome A004", "Descrizione dell'ordine"),
	createData(3, 262, "25-06-2022", "Nome Cognome A002", "Descrizione dell'ordine"),
	createData(4, 159, "25-06-2022", "Nome Cognome A001", "Descrizione dell'ordine"),
	createData(5, 356, "25-06-2022", "Nome Cognome A006", "Descrizione dell'ordine"),
	createData(6, 408, "25-06-2022", "Nome Cognome A001", "Descrizione dell'ordine"),
	createData(7, 237, "25-06-2022", "Nome Cognome A008", "Descrizione dell'ordine"),
	createData(8, 375, "25-06-2022", "Nome Cognome A003", "Descrizione dell'ordine"),
	createData(9, 518, "25-06-2022", "Nome Cognome A004", "Descrizione dell'ordine"),
	createData(10, 392, "26-06-2022", "Nome Cognome A004", "Descrizione dell'ordine"),
	createData(11, 318, "26-06-2022", "Nome Cognome A006", "Descrizione dell'ordine"),
	createData(12, 360, "26-06-2022", "Nome Cognome A007", "Descrizione dell'ordine"),
	createData(13, 437, "26-06-2022", "Nome Cognome A001", "Descrizione dell'ordine"),
];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
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
		id: "agent",
		label: "Agente",
	},
	{
		id: "description",
		label: "Descrizione",
	},
];

function CustomTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
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
									{order === "desc" ? "Ordine descrescente" : "Ordine crescente"}
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
										<TableRow hover tabIndex={-1} key={row.name}>
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
												<Link href="#">{row.agent}</Link>
											</TableCell>
											<TableCell align="center">{row.description}</TableCell>
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
