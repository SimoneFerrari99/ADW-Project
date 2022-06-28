import * as React from "react";

import { Container, Box } from "@mui/material";

import AmountRow from "./components/AmountRow";
import CustomerTable from "./components/CustomerTable";

export default function CustomerContent() {
	return (
		<main>
			<Container maxWidth="xl">
				<Box sx={{ mt: { xs: 2, sm: 3 } }}>
					<AmountRow />
				</Box>
				<Box sx={{ mt: { xs: 2, sm: 3 } }}>
					<CustomerTable />
				</Box>
			</Container>
		</main>
	);
}
