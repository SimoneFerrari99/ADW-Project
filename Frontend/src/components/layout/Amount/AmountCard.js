import { useState } from "react";

import { Box, Card, Typography, CardContent, Skeleton } from "@mui/material";

import LoadingError from "../Utils/LoadingError";

export default function AmountCard({ title, icon, data, loading, error }) {
	return (
		<Card sx={{ boxShadow: 4 }}>
			<CardContent
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					alignItems: "center",
					justifyContent: { xs: "center", sm: "space-evenly" },
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>{icon}</Box>
				<Box>
					<Typography
						variant="h6"
						component="div"
						align="center"
						sx={{ fontWeight: "bold" }}
					>
						{title}
					</Typography>
					<Typography
						variant="p"
						component="div"
						align="center"
						sx={{ fontSize: "1.5rem" }}
					>
						{loading ? (
							<Skeleton
								variant="text"
								animation="wave"
								sx={{ borderRadius: 2, ml: 1, width: "100%" }}
							/>
						) : error ? (
							<LoadingError />
						) : (
							`€ ${data}`
						)}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}
<Skeleton variant="text" animation="wave" sx={{ borderRadius: 2 }} />;
