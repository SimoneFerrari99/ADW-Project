import { Container, Box } from "@mui/material";

import TabPages from "../../components/layout/Tabs/TabPages";

import ManagerOrdersTable from "./components/ManagerOrdersTable";
import ManagerCustomersTable from "./components/ManagerCustomersTable";

export default function ManagerContent() {
	return (
		<main>
			<Container maxWidth="xl">
				<Box sx={{ mt: { xs: 2, sm: 3 } }}>
					<TabPages
						tabs={[<ManagerOrdersTable />, <ManagerCustomersTable />]}
						names={["test1", "test2"]}
					/>
				</Box>
			</Container>
		</main>
	);
}
