import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import { Box, AppBar, Toolbar, Typography, Skeleton } from "@mui/material/";

import AccountMenu from "./AccountMenu";
import LoadingError from "../Utils/LoadingError";

const name = gql`
	query GetName {
		customerById(custCode: "C00026") {
			custName
		}
	}
`;
export default function MenuAppBar({ user }) {
	const [auth, setAuth] = useState(true);

	const { data, loading, error } = useQuery(name);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton> */}
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, display: "flex" }}
					>
						Ciao,{" "}
						{loading ? (
							<Skeleton sx={{ width: 100, ml: 1 }} />
						) : error ? (
							<LoadingError />
						) : (
							data.customerById.custName
						)}
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
