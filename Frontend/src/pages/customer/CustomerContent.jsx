import { Container, Box } from "@mui/material";

import AmountRow from "./components/AmountRow";
import CustomerOrdersTable from "./components/CustomerOrdersTable";

export default function CustomerContent() {
	return (
		<main>
			<Container maxWidth="xl">
				<Box sx={{ mt: { xs: 2, sm: 3 } }}>
					<AmountRow />
				</Box>
				<Box sx={{ mt: { xs: 2, sm: 3 } }}>
					<CustomerOrdersTable />
				</Box>
			</Container>
		</main>
	);
}
