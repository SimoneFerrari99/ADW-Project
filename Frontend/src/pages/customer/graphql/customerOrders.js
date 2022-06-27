import { gql } from "@apollo/client";

export const customerOrders = gql`
	query GetOrdersByCustomerId {
		ordersByCustomerCustCode(custCode: "C00008") {
			ordNum
			ordAMT
			ordDate
			agent {
				agentCode
			}
			ordDescription
		}
	}
`;
