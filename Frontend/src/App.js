import MenuAppBar from "./components/layout/MenuAppBar";
import { Container } from "@mui/material";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";

import { React, Fragment } from "react";
import AmountRow from "./components/layout/AmountRow";
import DataTable from "./components/layout/Table";

export default function App() {
	return (
		<Fragment>
			<CssBaseline />
			<MenuAppBar />
			<main>
				<div>
					<Container maxWidth="xl">
						<Box sx={{ mt: { xs: 2, sm: 3 } }}>
							<AmountRow />
						</Box>
						<Box sx={{ mt: { xs: 2, sm: 3 } }}>
							<DataTable />
						</Box>
					</Container>
				</div>
			</main>
		</Fragment>
	);
}
