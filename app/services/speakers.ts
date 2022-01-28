import { Thumbnail } from './messages';
import gql from 'graphql-tag';
import { client } from './client';

export type Speaker = {
	id: string;
	name: string;
	bio: string;
	hero?: string;
	thumbnail?: Thumbnail;
	role?: string;
};

export async function getSpeakers(): Promise<Speaker[]> {
	const { data, loading, errors } = await client.query({
		query: gql`
			query {
				allSpeakers {
					edges {
						node {
							_meta {
								id
							}
							name
							thumbnail
							role
							bio
						}
					}
				}
			}
		`,
	});
	const speakers: Array<Speaker> = data.allSpeakers.edges.map(e => ({
		id: e.node._meta.id,
		name: e.node.name[0].text,
		bio: e.node.bio && e.node.bio[0].text,
		role: e.node.role[0].text,
		thumbnail: e.node.thumbnail,
	}));
	console.log(speakers);
	return speakers;
}

export async function getSpeaker(id: string): Promise<Speaker | unknown> {
	const message: Speaker | unknown = (await getSpeakers()).find(
		f => f.id === id
	);
	return message;
}
