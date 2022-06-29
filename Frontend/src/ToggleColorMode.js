import { useState, useMemo, createContext } from "react";
import { ReactSession } from "react-client-session";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./App";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode() {
	ReactSession.setStoreType("localStorage");

	let darkMode = false;

	if (String(ReactSession.get("DarkMode")) !== "undefined")
		darkMode = ReactSession.get("DarkMode");

	const [mode, setMode] = useState(darkMode ? "dark" : "light");
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
				ReactSession.set("DarkMode", !darkMode);
			},
		}),
		[darkMode]
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<App ColorModeContext={ColorModeContext} />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
