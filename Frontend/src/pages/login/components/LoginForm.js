import { Fragment } from "react";
import { ReactSession } from "react-client-session";

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

export default function LoginForm({ setAuth, darkModeButton }) {
	const loginButton = () => {
		ReactSession.set("auth", true);
		ReactSession.set("code", "C00008");
		ReactSession.set("userType", "C");

		setAuth(true);
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
				<Card>
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
									required
									fullWidth
									autoFocus
								/>
							</Box>
							<Box sx={{ display: "flex", alignItems: "flex-end" }}>
								<PasswordRounded sx={{ color: "action.active", mr: 1, my: 0.5 }} />
								<TextField
									id="password"
									label="Password"
									variant="standard"
									type="password"
									required
									fullWidth
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
				<Box sx={{ position: "absolute", top: "1rem", right: "1rem" }}>
					{darkModeButton}
				</Box>
			</Box>
		</Fragment>
	);
}
