import { Fragment } from "react";

import { IconButton } from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ToggleColorModeButton({ colorMode, theme }) {
	return (
		<Fragment>
			<IconButton
				sx={{ ml: 1 }}
				onClick={colorMode.toggleColorMode}
				color="inherit"
			>
				{theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
			</IconButton>
		</Fragment>
	);
}
