import { Fragment, useState, useContext } from "react";
import { ReactSession } from "react-client-session";
import { CssBaseline } from "@mui/material";

import LoginContent from "./pages/login/LoginContent";
import CustomerContent from "./pages/customer/CustomerContent";

import MenuAppBar from "./components/layout/Appbar/MenuAppBar";

import { useTheme } from "@mui/material/styles";

import { modeLabel } from "./utils/strings";
import ToggleColorModeButton from "./components/layout/Button/ToggleColorModeButton";

export default function App({ ColorModeContext }) {
	ReactSession.setStoreType("localStorage");
	const [auth, setAuth] = useState(ReactSession.get("auth"));

	const userType = String(ReactSession.get("userType"));
	const code = String(ReactSession.get("code"));

	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);

	return (
		<Fragment>
			{auth ? (
				<Fragment>
					<CssBaseline />
					<MenuAppBar
						setAuth={setAuth}
						userType={userType}
						code={code}
						darkModeButton={
							<ToggleColorModeButton theme={theme} colorMode={colorMode} />
						}
					/>
					<CustomerContent />
				</Fragment>
			) : (
				<Fragment>
					<CssBaseline />
					<LoginContent
						setAuth={setAuth}
						darkModeButton={
							<ToggleColorModeButton theme={theme} colorMode={colorMode} />
						}
					/>
				</Fragment>
			)}
		</Fragment>
	);
}
