import gql from 'graphql-tag';
import { client } from './client';
import { Speaker } from './speakers';

export type Thumbnail = {
	dimensions: {
		width: number;
		height: number;
	};
	alt: string;
	copyright: string;
	url: string;
};

export type Download = {
	label: string;
	link: string;
};
export type Message = {
	id: string;
	title: string;
	description: string;
	thumbnail?: Thumbnail;
	date: string;
	speakers?: Array<Speaker>;
	downloads?: Array<Download>;
	video?: string;
	podcast?: string;
};

export async function getMessages(): Promise<Message[]> {
	const { data, loading, errors } = await client.query({
		query: gql`
			query {
				allTalks {
					totalCount
					edges {
						node {
							_meta {
								id
							}
							title
							thumbnail
							date
							series {
								... on Series {
									title
									description
									_meta {
										id
									}
								}
							}
							embed_video
							podcast
							speakers {
								speaker {
									... on Speaker {
										name
										_meta {
											id
										}
										thumbnail
										role
									}
								}
							}
						}
					}
				}
			}
		`,
	});
	const messages: Array<Message> = data.allTalks.edges.map(e => ({
		id: e.node._meta.id,
		title: e.node.title[0].text,
		description: e.node.description,
		thumbnail: e.node.thumbnail,
		date: e.node.date,
		video: e.node.embed_video.embed_url,
		podcast: e.node.podcast.embed_url,
		speakers: e.node.speakers?.map(s => ({
			name: s.speaker.name[0].text,
			id: s.speaker._meta?.id,
			thumbnail: s.speaker.thumbnail,
			role: s.speaker.role[0]?.text,
		})),
	}));
	console.log(messages[0].speakers);
	return messages;
}

export async function getMessage(id: string): Promise<Message | unknown> {
	const message: Message | unknown = (await getMessages()).find(
		f => f.id === id
	);
	return message;
}
