import { Container, Box } from "@mui/material";

import AgentTable from "../agent/components/AgentTable";

export default function AgentContent() {
	return (
		<main>
			<Container maxWidth="xl">
				<Box sx={{ mt: { xs: 2, sm: 3 } }}>
					<AgentTable />
				</Box>
			</Container>
		</main>
	);
}
