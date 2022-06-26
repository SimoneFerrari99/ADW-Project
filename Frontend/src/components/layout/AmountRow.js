/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES IMPORT */
import * as React from "react";
import { useQuery, gql } from "@apollo/client";

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS IMPORT */
import AmountCard from "./AmountCard";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GRAPHQL QUERY */
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

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENT */
export default function AmountRow() {
	const { data, loading, error } = useQuery(amounts);

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" } }}>
			{loading ? <Skeleton /> : <AmountCard title="Opening" amtValue={data.customerById.openingAMT} iconName="opening" />}
			{loading ? <Skeleton /> : <AmountCard title="Receive" amtValue={data.customerById.receiveAMT} iconName="receive" />}
			{loading ? <Skeleton /> : <AmountCard title="Payment" amtValue={data.customerById.paymentAMT} iconName="payment" />}
			{loading ? <Skeleton /> : <AmountCard title="Outstanding" amtValue={data.customerById.outstandingAMT} iconName="outstanding" />}
		</Box>
	);
}
