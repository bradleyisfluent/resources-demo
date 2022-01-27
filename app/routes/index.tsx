import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { useLoaderData } from 'remix';

export const loader = async () => {
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
	console.log(resp);
	return resp.data.allSeriess;
};

export type Thumbnail = {
	dimensions: {
		width: number;
		height: number;
	};
	alt: string;
	copyright: string;
	url: string;
};

export type Talk = {
	title: string;
	thumbnail: string;
};

export type Series = {
	title: string;
	description: string;
	talks: Array<Talk>;
};

export type AllSeries = {
	totalCount: string;
	edges: Array<Series>;
};

export default function Index() {
	const data = useLoaderData<AllSeries>();
	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
			<p>We've got {data.totalCount} series</p>
			<ul>
				{data.edges.map(series => (
					<li key={series.title}>{JSON.stringify(series)}</li>
				))}
			</ul>
		</div>
	);
}
