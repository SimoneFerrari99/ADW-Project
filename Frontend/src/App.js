import { React, Fragment } from "react";
import { CssBaseline } from "@mui/material";

import ClientPage from "./pages/customer/CustomerPage";

import MenuAppBar from "./components/layout/Appbar/MenuAppBar";

const userType = "C";

export default function App() {
	return (
		<Fragment>
			<CssBaseline />
			<MenuAppBar user={userType} />
			<ClientPage />
		</Fragment>
	);
}
