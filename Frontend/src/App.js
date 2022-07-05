import { Fragment, useState, useContext } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { ReactSession } from "react-client-session";

import LoginContent from "./pages/login/LoginContent";
import CustomerContent from "./pages/customer/CustomerContent";
import AgentContent from "./pages/agent/AgentContent";
import ManagerContent from "./pages/manager/ManagerContent";

import SnackMessage from "./components/layout/Snack/SnackMessage";

import MenuAppBar from "./components/layout/Appbar/MenuAppBar";
import ToggleColorModeButton from "./components/layout/Button/ToggleColorModeButton";

import { CssBaseline } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { generalApplicationError } from "./utils/strings";

export default function App({ ColorModeContext }) {
	const client = useApolloClient();

	const [auth, setAuth] = useState(ReactSession.get("auth"));
	const userType = String(ReactSession.get("userType"));
	const code = String(ReactSession.get("code"));

	const GET_USER_INFO = gql`
		query getUserInfo($code: String!) {
			userById(code: $code) {
				typology
			}
		}
	`;

	const checkAuth = async function () {
		const { data } = await client.query({
			query: GET_USER_INFO,
			variables: {
				code: code || "",
			},
		});
		if (
			auth &&
			code &&
			userType != null &&
			data &&
			userType !== data.userById.typology
		) {
			ReactSession.set("auth", false);
			ReactSession.set("code", null);
			ReactSession.set("email", null);
			ReactSession.set("userType", null);
			setAuth(false);
		}
	};

	checkAuth();

	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);

	return (
		<Fragment>
			<CssBaseline />
			{auth ? (
				<Fragment>
					<MenuAppBar
						setAuth={setAuth}
						userType={userType}
						code={code}
						darkModeButton={
							<ToggleColorModeButton theme={theme} colorMode={colorMode} />
						}
					/>
					{userType === "C" ? (
						<CustomerContent />
					) : userType === "A" ? (
						<AgentContent />
					) : userType === "D" ? (
						<ManagerContent />
					) : (
						() => {
							setAuth(false);
							return <SnackMessage text={generalApplicationError} />;
						}
					)}
				</Fragment>
			) : (
				<Fragment>
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
