import { Container, Box } from "@mui/material";

import AgentOrdersTable from "../agent/components/AgentOrdersTable";

export default function DirigentContent() {
	return (
		<main>
			<Container maxWidth="xl">
				<Box sx={{ mt: { xs: 2, sm: 3 } }}>
					<AgentOrdersTable />
				</Box>
			</Container>
		</main>
	);
}
