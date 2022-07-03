import { Container, Box } from "@mui/material";

import ManagerOrdersTable from "../manager/components/ManagerOrdersTable";

export default function ManagerContent() {
	return (
		<main>
			<Container maxWidth="xl">
				<Box sx={{ mt: { xs: 2, sm: 3 } }}>
					<ManagerOrdersTable />
				</Box>
			</Container>
		</main>
	);
}
