import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const link = new HttpLink({
	uri: process.env.NEXT_PUBLIC_WORDPRESS_URL + "/graphql",
	credentials: "include",
});

export const apolloClient = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});
