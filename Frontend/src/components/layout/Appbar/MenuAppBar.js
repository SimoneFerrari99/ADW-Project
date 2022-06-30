import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import { Box, AppBar, Toolbar, Typography, Skeleton } from "@mui/material/";

import AccountMenu from "./AccountMenu";
import LoadingError from "../Error/LoadingError";

import SpecificPersonInfoDialog from "../Dialog/SpecificPersonInfoDialog";

import { myProfileLabel } from "../../../utils/strings";

export default function MenuAppBar({
	userType,
	code,
	setAuth,
	darkModeButton,
}) {
	const getUserName = gql`
	query GetName {${userType === "C" ? "customerById" : "agentById"}(
		${userType === "C" ? "custCode" : "agentCode"}: ${'"' + code + '"'}) {
			${userType === "C" ? "custName" : "agentName"}
		}
	}
`;
	const [myProfileDialogOpened, setMyProfileDialogOpened] = useState(false);

	const handleOpenMyProfileDialog = () => {
		setMyProfileDialogOpened(true);
	};

	const handleCloseMyProfileDialog = () => {
		setMyProfileDialogOpened(false);
	};

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
					<div>{darkModeButton}</div>
					<div>
						<AccountMenu
							setAuth={setAuth}
							handleOpenMyProfileDialog={handleOpenMyProfileDialog}
						/>
					</div>
				</Toolbar>
			</AppBar>

			{myProfileDialogOpened && userType === "C" && (
				<SpecificPersonInfoDialog
					title={myProfileLabel}
					open={myProfileDialogOpened}
					handleClose={handleCloseMyProfileDialog}
					custCode={String(code)}
					myProfileInfo={true}
				/>
			)}
			{myProfileDialogOpened && userType !== "C" && (
				<SpecificPersonInfoDialog
					title={myProfileLabel}
					open={myProfileDialogOpened}
					handleClose={handleCloseMyProfileDialog}
					agentCode={String(code)}
					myProfileInfo={true}
				/>
			)}
		</Box>
	);
}
