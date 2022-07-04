import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import ToggleColorMode from "./ToggleColorMode";

const defaultOptions = {
	watchQuery: { fetchPolicy: "no-cache", errorPolicy: "ignore" },
	query: { fetchPolicy: "no-cache", errorPolicy: "all" },
};

const client = new ApolloClient({
	uri: "http://192.168.1.69:4000/graphql",
	cache: new InMemoryCache(),
	defaultOptions: defaultOptions,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<ApolloProvider client={client}>
			<ToggleColorMode />
		</ApolloProvider>
	</StrictMode>
);
