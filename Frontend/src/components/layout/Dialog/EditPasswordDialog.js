import { Fragment, useState } from "react";
import { ReactSession } from "react-client-session";
import { gql, useApolloClient } from "@apollo/client";

import { Box, DialogActions, Button, Stack, TextField } from "@mui/material";

import { PasswordRounded } from "@mui/icons-material";

import InfoDialog from "./InfoDialog";

import {
	wrongPasswordLabel,
	passwordMismatchLabel,
	confirmChangePasswordLabel,
} from "../../../utils/strings";

export default function EditPasswordDialog({ title, open, handleClose }) {
	const client = useApolloClient();
	const [actualPassword, setActualPassword] = useState("");
	const [newPassword1, setNewPassword1] = useState("");
	const [newPassword2, setNewPassword2] = useState("");

	const [passwordMismatch, setPasswordMismatch] = useState(false);
	const [wrongPassword, setWrongPassword] = useState(false);

	const handleActualPasswordChange = (event) => {
		setActualPassword(event.target.value);
	};

	const handlePassword1Change = (event) => {
		setPasswordMismatch(false);
		setWrongPassword(false);
		setNewPassword1(event.target.value);
	};

	const handlePassword2Change = (event) => {
		setPasswordMismatch(false);
		setWrongPassword(false);
		setNewPassword2(event.target.value);
	};

	const email = ReactSession.get("email");

	const userAuthQuery = gql`
		query UserAuth {
			userAuth(email: "${email}", password: "${actualPassword}") {
				code
				typology
				active
			}
		}
	`;

	const handleChangePassword = async (event) => {
		event.preventDefault();
		console.log(email, actualPassword);
		const { data } = await client.query({
			query: userAuthQuery,
		});
		console.log(data);

		if (data.userAuth === null) {
			setWrongPassword(true);
		} else if (newPassword1 === "" || newPassword1 !== newPassword2) {
			setPasswordMismatch(true);
		} else {
			// TODO INVIA NUOVA PASSWORD
			handleClose();
		}
	};

	return (
		<InfoDialog
			title={title}
			open={open}
			handleClose={handleClose}
			loading={false}
			error={false}
			InfoDialogBody={
				<Fragment>
					<Box id="changePasswordForm" component="form">
						<Stack spacing={2}>
							<Box sx={{ display: "flex", alignItems: "flex-end" }}>
								<PasswordRounded sx={{ color: "action.active", mr: 1, my: 0.5 }} />
								<TextField
									id="actualPassword"
									label="Password attuale"
									variant="standard"
									type="password"
									error={wrongPassword}
									helperText={wrongPassword && wrongPasswordLabel}
									required
									fullWidth
									value={actualPassword}
									onChange={handleActualPasswordChange}
								/>
							</Box>
							<Box sx={{ display: "flex", alignItems: "flex-end" }}>
								<PasswordRounded sx={{ color: "action.active", mr: 1, my: 0.5 }} />
								<TextField
									id="newPassword1"
									label="Nuova password"
									variant="standard"
									type="password"
									error={passwordMismatch}
									helperText={passwordMismatch && passwordMismatchLabel}
									required
									fullWidth
									value={newPassword1}
									onChange={handlePassword1Change}
								/>
							</Box>
							<Box sx={{ display: "flex", alignItems: "flex-end" }}>
								<PasswordRounded sx={{ color: "action.active", mr: 1, my: 0.5 }} />
								<TextField
									id="newPassword2"
									label="Conferma nuova password"
									variant="standard"
									type="password"
									error={passwordMismatch}
									helperText={passwordMismatch && passwordMismatchLabel}
									required
									fullWidth
									value={newPassword2}
									onChange={handlePassword2Change}
								/>
							</Box>
						</Stack>
					</Box>
				</Fragment>
			}
			dialogActions={
				<DialogActions>
					<Button
						type="submit"
						variant="contained"
						form="changePasswordForm"
						onClick={handleChangePassword}
					>
						{confirmChangePasswordLabel}
					</Button>
				</DialogActions>
			}
		/>
	);
}
