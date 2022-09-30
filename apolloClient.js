import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri: process.env.CMS_URI,
});

const authLink = setContext((_, { headers }) => {
	const token = process.env.CMS_TOKEN;
	return {
		headers: {
			...headers,
			Authorization: `Bearer ${token}`,
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
