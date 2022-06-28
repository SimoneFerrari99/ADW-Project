import { Fragment } from "react";

import { ListItemIcon, MenuItem } from "@mui/material";

import { LogoutRounded } from "@mui/icons-material";

export default function Logout({ setAuth }) {
	const handleLogOut = () => {
		//TODO: logica di eliminazione localstorage
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
