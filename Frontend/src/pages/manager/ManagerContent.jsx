import { Container, Box } from "@mui/material";

import TabPages from "../../components/layout/Tabs/TabPages";

import ManagerOrdersTable from "./components/ManagerOrdersTable";
import ManagerCustomersTable from "./components/ManagerCustomersTable";
import ManagerAgentsTable from "./components/ManagerAgentsTable";

export default function ManagerContent() {
	return (
		<main>
			<Container maxWidth="xl">
				<Box sx={{ mt: { xs: 2, sm: 3 } }}>
					<TabPages
						tabs={[
							<ManagerOrdersTable />,
							<ManagerCustomersTable />,
							<ManagerAgentsTable />,
						]}
						names={["Ordini", "Clienti", "Agenti"]}
					/>
				</Box>
			</Container>
		</main>
	);
}
