import MenuAppBar from "./components/layout/MenuAppBar";
import { Container } from "@mui/material";
import { CssBaseline } from "@mui/material";

import { React, Fragment } from "react";
import AmountRow from "./components/layout/AmountRow";

export default function App() {
	return (
		<Fragment>
			<CssBaseline />
			<MenuAppBar />
			<main>
				<div>
					<Container maxWidth="xl" sx={{ mt: { xs: 2, sm: 3 } }}>
						<AmountRow />
					</Container>
				</div>
			</main>
		</Fragment>
	);
}
