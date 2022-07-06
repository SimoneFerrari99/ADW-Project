/* COMPONENTE PER L'ICONA DEL PROFILO NELLA APP BAR*/

import { useState, Fragment } from "react";

import { Box, Avatar, IconButton, Tooltip } from "@mui/material";

import ProfileMenu from "./ProfileMenu";

export default function AccountMenu({
	setAuth,
	handleOpenMyProfileDialog,
	userName,
}) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Fragment>
			<Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
				<Tooltip title="Profilo e impostazioni">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? "account-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
					>
						<Avatar sx={{ width: 32, height: 32 }}>
							{userName && userName.charAt(0).toUpperCase()}
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<ProfileMenu
				anchorEl={anchorEl}
				open={open}
				handleClose={handleClose}
				setAuth={setAuth}
				handleOpenMyProfileDialog={handleOpenMyProfileDialog}
			/>
		</Fragment>
	);
}
