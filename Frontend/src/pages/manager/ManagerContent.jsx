import { Container, Box } from "@mui/material";
import CustomerOrdersTable from "../customer/components/CustomerOrdersTable";

import ManagerOrdersTable from "../manager/components/ManagerOrdersTable";
import ManagerCustomersTable from "./components/ManagerCustomersTable";

export default function ManagerContent() {
	return (
		<main>
			<Container maxWidth="xl">
				<Box sx={{ mt: { xs: 2, sm: 3 } }}>
					<ManagerOrdersTable />
					<ManagerCustomersTable />
				</Box>
			</Container>
		</main>
	);
}
