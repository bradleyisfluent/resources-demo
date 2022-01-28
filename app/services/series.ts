import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { Message } from './messages';

export type Series = {
	title: string;
	description: string;
	messages: Array<Message>;
};

export async function getSeries(): Promise<Series[]> {
	const messages: Array<Series> = [
		{
			title: 'Revival',
			description: 'A new series for the new year',
			messages: [],
		},
	];
	return Promise.all(messages);
}

export async function getMessages() {
	const client = new ApolloClient({
		link: PrismicLink({
			uri: 'https://c3-resources.cdn.prismic.io/graphql',
		}),
		cache: new InMemoryCache(),
	});
	const resp = await client.query({
		query: gql`
			query {
				allSeriess {
					totalCount
					edges {
						node {
							title
							description
							talks {
								talk {
									... on Talk {
										title
										thumbnail
									}
								}
							}
						}
					}
				}
			}
		`,
	});
	return resp.data.allSeriess;
}
