import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	link: PrismicLink({
		uri: 'https://c3-resources.cdn.prismic.io/graphql',
	}),
	cache: new InMemoryCache(),
});
