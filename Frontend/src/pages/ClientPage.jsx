import * as React from "react";

import { Container, Box } from "@mui/material";

import AmountRow from "../components/layout/AmountComponents/AmountRow";
import CustomTable from "../components/layout/TableComponents/CustomTable";

export default function ClientPage() {
	return (
		<main>
			<Container maxWidth="xl">
				<Box sx={{ mt: { xs: 2, sm: 3 } }}>
					<AmountRow />
				</Box>
				<Box sx={{ mt: { xs: 2, sm: 3 } }}>
					<CustomTable />
				</Box>
			</Container>
		</main>
	);
}
