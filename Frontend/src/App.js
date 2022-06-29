import { Fragment, useState } from "react";
import { ReactSession } from "react-client-session";
import { CssBaseline } from "@mui/material";

import LoginContent from "./pages/login/LoginContent";
import CustomerContent from "./pages/customer/CustomerContent";

import MenuAppBar from "./components/layout/Appbar/MenuAppBar";

export default function App() {
	ReactSession.setStoreType("localStorage");
	const [auth, setAuth] = useState(ReactSession.get("auth"));

	const userType = String(ReactSession.get("userType"));
	const code = String(ReactSession.get("code"));

	return (
		<Fragment>
			{auth ? (
				<Fragment>
					<CssBaseline />
					<MenuAppBar setAuth={setAuth} userType={userType} code={code} />
					<CustomerContent />
				</Fragment>
			) : (
				<LoginContent setAuth={setAuth} />
			)}
		</Fragment>
	);
}
