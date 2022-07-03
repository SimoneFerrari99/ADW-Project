import { Container, Box } from "@mui/material";

import AgentOrdersTable from "./components/AgentOrdersTable";

export default function AgentContent() {
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
