import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import { Box, Skeleton } from "@mui/material/";

import AmountCard from "./AmountCard";
import LoadingError from "../UtilsComponents/LoadingError";

const amounts = gql`
	query GetAmounts {
		customerById(custCode: "C00026") {
			openingAMT
			receiveAMT
			paymentAMT
			outstandingAMT
		}
	}
`;

export default function AmountRow() {
	const { data, loading, error } = useQuery(amounts);

	return (
		<Box
			sx={{
				display: "grid",
				gap: 2,
				gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
			}}
		>
			{loading ? (
				<Skeleton
					variant="rectangular"
					animation="wave"
					height={100}
					sx={{ borderRadius: 2 }}
				/>
			) : error ? (
				<LoadingError />
			) : (
				<AmountCard
					title="Opening"
					amtValue={data.customerById.openingAMT}
					iconName="opening"
				/>
			)}
			{loading ? (
				<Skeleton
					variant="rectangular"
					animation="wave"
					height={100}
					sx={{ borderRadius: 2 }}
				/>
			) : error ? (
				<LoadingError />
			) : (
				<AmountCard
					title="Receive"
					amtValue={data.customerById.receiveAMT}
					iconName="receive"
				/>
			)}
			{loading ? (
				<Skeleton
					variant="rectangular"
					animation="wave"
					height={100}
					sx={{ borderRadius: 2 }}
				/>
			) : error ? (
				<LoadingError />
			) : (
				<AmountCard
					title="Payment"
					amtValue={data.customerById.paymentAMT}
					iconName="payment"
				/>
			)}
			{loading ? (
				<Skeleton
					variant="rectangular"
					animation="wave"
					height={100}
					sx={{ borderRadius: 2 }}
				/>
			) : error ? (
				<LoadingError />
			) : (
				<AmountCard
					title="Outstanding"
					amtValue={data.customerById.outstandingAMT}
					iconName="outstanding"
				/>
			)}
		</Box>
	);
}
