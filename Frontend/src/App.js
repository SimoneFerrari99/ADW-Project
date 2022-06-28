import { React, Fragment } from "react";
import { CssBaseline } from "@mui/material";

import CustomerContent from "./pages/customer/CustomerContent";

import MenuAppBar from "./components/layout/Appbar/MenuAppBar";

const userType = "C";

export default function App() {
	return (
		<Fragment>
			<CssBaseline />
			<MenuAppBar user={userType} />
			<CustomerContent />
		</Fragment>
	);
}
