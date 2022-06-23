import "./App.css";

import Button from "@mui/material/Button";
import MenuAppBar from "./components/layout/MenuAppBar";
import Container from "./components/layout/AppContainer";

import { React, Fragment } from "react";

export default function App() {
	return (
		<Fragment>
			<MenuAppBar></MenuAppBar>
			<Container maxWidth="xl">
				<Button variant="contained">Hello World</Button>
			</Container>
		</Fragment>
	);
}
