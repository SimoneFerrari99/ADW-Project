import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import ToggleColorMode from "./ToggleColorMode";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<ApolloProvider client={client}>
			<ToggleColorMode />
		</ApolloProvider>
	</StrictMode>
);
