/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES IMPORT */
import * as React from "react";
import { useQuery, gql } from "@apollo/client";

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS IMPORT */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountMenu from "./AccountMenu";
import Skeleton from "@mui/material/Skeleton";
import LoadingError from "./LoadingError";

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GRAPHQL QUERY */
const name = gql`
	query GetName {
		customerById(custCode: "C00026") {
			custName
		}
	}
`;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENT */
export default function MenuAppBar() {
	const [auth, setAuth] = React.useState(true);

	const { data, loading, error } = useQuery(name);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton> */}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, display: "flex" }}>
						Ciao, {loading ? <Skeleton sx={{ width: 100, ml: 1 }} /> : error ? <LoadingError /> : data.customerById.custName}
					</Typography>
					{auth && (
						<div>
							<AccountMenu />
						</div>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
