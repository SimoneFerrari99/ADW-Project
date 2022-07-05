import { Fragment, useState } from "react";
import { ReactSession } from "react-client-session";
import { gql, useApolloClient } from "@apollo/client";

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
import SnackMessage from "../../../components/layout/Snack/SnackMessage";

import {
	loginErrorAlertText,
	wrongEmailLabel,
	wrongPasswordLabel,
	userDisabledAlertText,
} from "../../../utils/strings";

export default function LoginForm({ setAuth, darkModeButton }) {
	const client = useApolloClient();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loginResult, setLoginResult] = useState("");

	const handleEmailChange = (event) => {
		setEmail(event.target.value.toLowerCase());
	};

	const handlePasswordChange = (event) => {
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

	const loginButton = async (event) => {
		event.preventDefault();
		const { data } = await client.query({
			query: userAuthQuery,
		});

		if (data.userAuth) {
			if (data.userAuth.active) {
				ReactSession.set("auth", true);
				ReactSession.set("code", String(data.userAuth.code));
				ReactSession.set("email", String(email));
				ReactSession.set("userType", String(data.userAuth.typology));
				setAuth(true);
			} else {
				setLoginResult("disabled");
			}
		} else {
			setLoginResult("error");
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
				<Box>
					<Card sx={{ boxShadow: 8, mx: 3 }}>
						<CardHeader
							title="Accedi ad ADW Project!"
							subheader="Non hai un account? Scrivici a info@ADWProject.it"
						/>
						<CardContent>
							<Box id="accessForm" component="form">
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
											error={loginResult}
											helperText={loginResult && wrongEmailLabel}
											required
											fullWidth
											autoFocus
											value={email}
											onChange={handleEmailChange}
											autoComplete="email"
										/>
									</Box>
									<Box sx={{ display: "flex", alignItems: "flex-end" }}>
										<PasswordRounded sx={{ color: "action.active", mr: 1, my: 0.5 }} />
										<TextField
											id="password"
											label="Password"
											variant="standard"
											type="password"
											error={loginResult}
											helperText={loginResult && wrongPasswordLabel}
											required
											fullWidth
											value={password}
											onChange={handlePasswordChange}
											autoComplete="current-password"
										/>
									</Box>
								</Stack>
							</Box>
						</CardContent>
						<CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
							<Button
								variant="contained"
								onClick={loginButton}
								type="submit"
								form="accessForm"
							>
								Accedi
							</Button>
						</CardActions>
					</Card>
				</Box>
				<Box sx={{ position: "absolute", top: "1rem", right: "1rem" }}>
					{darkModeButton}
				</Box>
			</Box>
			{loginResult === "error" && (
				<SnackMessage
					text={loginErrorAlertText}
					variant="filled"
					severity="error"
					reset={setLoginResult}
				/>
			)}
			{loginResult === "disabled" && (
				<SnackMessage
					text={userDisabledAlertText}
					variant="filled"
					severity="warning"
					reset={setLoginResult}
				/>
			)}
		</Fragment>
	);
}
