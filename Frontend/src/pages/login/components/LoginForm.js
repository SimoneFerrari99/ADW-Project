import { Fragment, useState } from "react";
import { ReactSession } from "react-client-session";
import { gql, useLazyQuery, useApolloClient } from "@apollo/client";

import {
	Button,
	Box,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	TextField,
	Stack,
} from "@mui/material";

import { AlternateEmailRounded, PasswordRounded } from "@mui/icons-material";
import LoadingError from "../../../components/layout/Error/LoadingError";

import {
	loginErrorAlertText,
	wrongEmailLabel,
	wrongPasswordLabel,
	userDisabledAlertText,
	connectionError,
} from "../../../utils/strings";

export default function LoginForm({ setAuth, darkModeButton }) {
	const client = useApolloClient();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loginError, setLoginError] = useState(false);
	const [userDisabled, setUserDisabled] = useState(false);

	const handleEmailChange = (event) => {
		setLoginError(false);
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setLoginError(false);
		setPassword(event.target.value);
	};

	const userAuthQuery = gql`
		query UserAuth {
			userAuth(email: "${email}", password: "${password}") {
				code
				typology
				active
			}
		}
	`;

	const loginButton = async () => {
		const { data } = await client.query({
			query: userAuthQuery,
		});
		console.log(email, password);
		console.log(data);

		if (data.userAuth) {
			if (data.userAuth.active) {
				ReactSession.set("auth", true);
				ReactSession.set("code", String(data.userAuth.code));
				ReactSession.set("userType", String(data.userAuth.typology));
				setAuth(true);
			} else {
				setUserDisabled(true);
			}
		} else {
			setLoginError(true);
			setEmail("");
			setPassword("");
		}
	};

	return (
		<Fragment>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
				}}
			>
				<Box component="form">
					<Card sx={{ boxShadow: 8 }}>
						<CardHeader
							title="Accedi ad ADW Project!"
							subheader="Non hai un account? Scrivici a info@ADWProject.it"
						/>
						<CardContent>
							<Stack spacing={2}>
								<Box sx={{ display: "flex", alignItems: "flex-end" }}>
									<AlternateEmailRounded
										sx={{ color: "action.active", mr: 1, my: 0.5 }}
									/>
									<TextField
										id="email"
										label="Email"
										variant="standard"
										type="text"
										error={loginError}
										helperText={loginError && wrongEmailLabel}
										required
										fullWidth
										autoFocus
										value={email}
										onChange={handleEmailChange}
									/>
								</Box>
								<Box sx={{ display: "flex", alignItems: "flex-end" }}>
									<PasswordRounded sx={{ color: "action.active", mr: 1, my: 0.5 }} />
									<TextField
										id="password"
										label="Password"
										variant="standard"
										type="password"
										error={loginError}
										helperText={loginError && wrongPasswordLabel}
										required
										fullWidth
										value={password}
										onChange={handlePasswordChange}
									/>
								</Box>
							</Stack>
						</CardContent>
						<CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
							<Button variant="contained" onClick={loginButton}>
								Accedi
							</Button>
						</CardActions>
					</Card>
				</Box>
				<Box sx={{ position: "absolute", top: "1rem", right: "1rem" }}>
					{darkModeButton}
				</Box>
			</Box>
			{loginError && (
				<LoadingError
					text={loginErrorAlertText}
					variant={"filled"}
					severity={"error"}
				/>
			)}
			{userDisabled && (
				<LoadingError
					text={userDisabledAlertText}
					variant={"filled"}
					severity={"warning"}
				/>
			)}
		</Fragment>
	);
}
