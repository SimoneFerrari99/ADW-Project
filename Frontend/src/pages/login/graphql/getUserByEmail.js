import { gql } from "@apollo/client";

export const getUserByEmail = gql`
	query GetUserByEmail {
		userByEmail(email: "cliente@gmail.com") {
			code
			pw
			typology
			active
		}
	}
`;
