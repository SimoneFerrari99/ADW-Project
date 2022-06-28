import { Fragment, useState } from "react";
import { CssBaseline } from "@mui/material";

import LoginContent from "./pages/login/LoginContent";
import CustomerContent from "./pages/customer/CustomerContent";

import MenuAppBar from "./components/layout/Appbar/MenuAppBar";

const userType = "C";

export default function App() {
	const [auth, setAuth] = useState(true);

	return (
		<Fragment>
			{auth ? (
				<Fragment>
					<CssBaseline />
					<MenuAppBar setAuth={setAuth} user={userType} />
					<CustomerContent />
				</Fragment>
			) : (
				<LoginContent />
			)}
		</Fragment>
	);
}
