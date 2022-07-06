/* COMPONENTE PER LA APP BAR */

import { useState } from "react";
import { ReactSession } from "react-client-session";
import { useQuery, gql } from "@apollo/client";

import { Box, AppBar, Toolbar, Typography, Skeleton } from "@mui/material/";

import AccountMenu from "./AccountMenu";
import SnackMessage from "../Snack/SnackMessage";

import SpecificPersonInfoDialog from "../Dialog/SpecificPersonInfoDialog";

import { myProfileLabel } from "../../../utils/strings";

export default function MenuAppBar({
	userType,
	code,
	setAuth,
	darkModeButton,
}) {
	/* Query per prendere il nome utente */
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
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, display: "flex" }}
					>
						Ciao,{" "}
						{loading ? (
							<Skeleton sx={{ width: 100, ml: 1 }} />
						) : error ? (
							<SnackMessage />
						) : userType === "C" ? (
							data.customerById.custName
						) : (
							data.agentById.agentName
						)}{" "}
						{(ReactSession.get("userType") === "A" && " (Agent)") ||
							(ReactSession.get("userType") === "D" && " (Manager)") ||
							""}
					</Typography>
					<div>{darkModeButton}</div>
					<div>
						<AccountMenu
							setAuth={setAuth}
							handleOpenMyProfileDialog={handleOpenMyProfileDialog}
							userName={
								!loading &&
								!error &&
								((userType === "C" && data.customerById.custName) ||
									(userType !== "C" && data.agentById.agentName))
							}
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
