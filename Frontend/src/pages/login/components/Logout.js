import { ReactSession } from "react-client-session";

import { ListItemIcon, MenuItem } from "@mui/material";

import { LogoutRounded } from "@mui/icons-material";

export default function Logout({ setAuth }) {
	const handleLogOut = () => {
		//TODO: logica di eliminazione localstorage
		ReactSession.set("auth", false);
		ReactSession.set("code", null);
		ReactSession.set("email", null);
		ReactSession.set("userType", null);
		setAuth(false);
	};

	return (
		<MenuItem onClick={handleLogOut}>
			<ListItemIcon>
				<LogoutRounded fontSize="small" />
			</ListItemIcon>
			Logout
		</MenuItem>
	);
}
