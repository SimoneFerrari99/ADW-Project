/* COMPONENTE PER LA GESTIONE DELLE TABS NELLA PAGINA PRINCIPALE */

import { useState } from "react";
import PropTypes from "prop-types";

import { Tabs, Tab, Typography, Box, tabsClasses } from "@mui/material/";

function TabPanel({ children, value, index, ...other }) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tab-numero-${index}`}
			aria-labelledby={`tab-numero-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ pt: 2 }}>
					<Typography variant="p">{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `tab-numero-${index}`,
		"aria-labelledby": `tab-numero-${index}`,
	};
}

export default function TabPages({ tabs, names }) {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="Tabs della pagina"
					variant="scrollable"
					scrollButtons
					sx={{
						[`& .${tabsClasses.scrollButtons}`]: {
							"&.Mui-disabled": { opacity: 0.3 },
						},
					}}
				>
					{names.map((name, index) => (
						<Tab label={name} index={index} key={index} {...a11yProps(index)} />
					))}
				</Tabs>
			</Box>
			{tabs.map((tab, index) => (
				<TabPanel
					value={value}
					index={index}
					key={index}
					id={`tab-numero-${index}`}
					aria-labelledby={`tab-numero-${index}`}
				>
					{tab}
				</TabPanel>
			))}
		</Box>
	);
}
