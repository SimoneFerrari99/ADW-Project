import { Container, Box } from "@mui/material";

import AgentOrdersTable from "./components/AgentOrdersTable";
import TabPages from "../../components/layout/Tabs/TabPages";

export default function AgentContent() {
	return (
		<main>
			<Container maxWidth="xl">
				<Box sx={{ mt: { xs: 2, sm: 3 } }}>
					<TabPages tabs={[<AgentOrdersTable />]} names={["Ordini", "Clienti"]} />
				</Box>
			</Container>
		</main>
	);
}
