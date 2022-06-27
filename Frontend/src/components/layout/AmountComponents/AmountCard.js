import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AssuredWorkloadRoundedIcon from "@mui/icons-material/AssuredWorkloadRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

const getIconFromName = (iconName) => {
	switch (iconName) {
		case "opening":
			return <AttachMoneyRoundedIcon sx={{ fontSize: { xs: 25, sm: 30, md: 40 } }} />;
		case "receive":
			return <AssuredWorkloadRoundedIcon sx={{ fontSize: { xs: 25, sm: 30, md: 40 } }} />;
		case "payment":
			return <ReceiptRoundedIcon sx={{ fontSize: { xs: 25, sm: 30, md: 40 } }} />;
		case "outstanding":
			return <AccessTimeIcon sx={{ fontSize: { xs: 25, sm: 30, md: 40 } }} />;
		default:
			return <InfoRoundedIcon sx={{ fontSize: { xs: 25, sm: 30, md: 40 } }} />;
	}
};

export default function AmountCard({ title, amtValue, bgColor, iconName }) {
	return (
		<Card sx={{ boxShadow: 4, backgroundColor: `${bgColor}` }}>
			<CardContent
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					alignItems: "center",
					justifyContent: { xs: "center", sm: "space-evenly" },
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>{getIconFromName(iconName)}</Box>
				<Box>
					<Typography variant="h6" component="div" align="center" sx={{ fontWeight: "bold" }}>
						{title}
					</Typography>

					<Typography variant="p" component="div" align="center" sx={{ fontSize: "1.5rem" }}>
						<Box>€{amtValue}</Box>
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}
