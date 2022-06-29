import { Fragment, useState } from "react";
import { ReactSession } from "react-client-session";
import { gql, useQuery } from "@apollo/client";

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
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loginError, setLoginError] = useState(false);
	const [userDisabled, setUserDisabled] = useState(false);

	const handleEmailChange = (event) => {
		setLoginError(false);
		setUserDisabled(false);
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setLoginError(false);
		setUserDisabled(false);
		setPassword(event.target.value);
	};

	const getUserByEmail = gql`
		query GetUserByEmail {
			userByEmail(email: "${email}") {
				code
				pw
				typology
				active
			}
		}
	`;

	const { data, error, loading } = useQuery(getUserByEmail);

	const loginButton = () => {
		if (!loading && !error && data.userByEmail != null) {
			let userPassword = data.userByEmail.pw;
			if (data.userByEmail.active) {
				if (password === userPassword) {
					ReactSession.set("auth", true);
					ReactSession.set("code", String(data.userByEmail.code));
					ReactSession.set("userType", String(data.userByEmail.typology));
					setAuth(true);
					return;
				}
			} else {
				setUserDisabled(true);
				setEmail("");
				setPassword("");
				return;
			}
		}
		setLoginError(true);
		setEmail("");
		setPassword("");
		return;
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
			{!loading && error && (
				<LoadingError
					text={connectionError}
					variant={"filled"}
					severity={"error"}
				/>
			)}
		</Fragment>
	);
}
