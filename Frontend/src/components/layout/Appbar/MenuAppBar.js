import { useQuery, gql } from "@apollo/client";

import { Box, AppBar, Toolbar, Typography, Skeleton } from "@mui/material/";

import AccountMenu from "./AccountMenu";
import LoadingError from "../Error/LoadingError";

const userType = "C";
const code = "C00002";

const getUserName = gql`
	query GetName {${userType === "C" ? "customerById" : "agentById"}(
		${userType === "C" ? "custCode" : "agentCode"}: ${'"' + code + '"'}) {
			${userType === "C" ? "custName" : "agentName"}
		}
	}
`;

export default function MenuAppBar({ user, auth, setAuth }) {
	const { data, loading, error } = useQuery(getUserName);

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
						) : userType === "C" ? (
							data.customerById.custName
						) : (
							data.agentById.agentName
						)}
					</Typography>
					<div>
						<AccountMenu setAuth={setAuth} />
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
