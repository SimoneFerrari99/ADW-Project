import { useQuery, gql } from "@apollo/client";

import { Box } from "@mui/material/";
import {
	AttachMoneyRounded,
	AssuredWorkloadRounded,
	ReceiptRounded,
	AccessTime,
} from "@mui/icons-material";

import AmountCard from "../../../components/layout/Amount/AmountCard";

import {
	openingAmountCardLabel,
	receiveAmountCardLabel,
	paymentAmountCardLabel,
	outstandingAmountCardLabel,
} from "../../../utils/strings";

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
			<AmountCard
				loading={loading}
				error={error}
				title={openingAmountCardLabel}
				data={loading ? null : error ? null : data.customerById.openingAMT}
				icon={<AttachMoneyRounded sx={iconStyle} />}
			/>
			<AmountCard
				loading={loading}
				error={error}
				title={receiveAmountCardLabel}
				data={loading ? null : error ? null : data.customerById.receiveAMT}
				icon={<AssuredWorkloadRounded sx={iconStyle} />}
			/>
			<AmountCard
				loading={loading}
				error={error}
				title={paymentAmountCardLabel}
				data={loading ? null : error ? null : data.customerById.paymentAMT}
				icon={<ReceiptRounded sx={iconStyle} />}
			/>
			<AmountCard
				loading={loading}
				error={error}
				title={outstandingAmountCardLabel}
				data={loading ? null : error ? null : data.customerById.outstandingAMT}
				icon={<AccessTime sx={iconStyle} />}
			/>
		</Box>
	);
}

const iconStyle = { fontSize: { xs: 25, sm: 30, md: 40 } };
