import { Badge, Box, Image } from '@chakra-ui/react';
import { Link, useLoaderData } from 'remix';
import { getMessages, Message, Thumbnail } from '~/services/messages';

export const loader = () => {
	return getMessages();
};

function MessageBox({
	id,
	title,
	date,
	thumbnail,
}: {
	id: string;
	title: string;
	date: string;
	thumbnail?: Thumbnail;
}) {
	return (
		<Link to={`/messages/${id}`}>
			<Box
				maxW="sm"
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
			>
				<Image src={thumbnail?.url} alt={thumbnail?.alt} />
				<Box p="6">
					<Box display="flex" alignItems="baseline">
						<Badge borderRadius="full" px="2" colorScheme="teal">
							New
						</Badge>
					</Box>
					<Box
						mt="1"
						fontWeight="semibold"
						as="h4"
						lineHeight="tight"
						isTruncated
					>
						{title} - {date}
					</Box>
				</Box>
			</Box>
		</Link>
	);
}

export default function Messages() {
	const messages = useLoaderData<Message[]>();
	return (
		<div>
			<h1>All Messages</h1>
			{messages.map(m => {
				return (
					<MessageBox
						id={m.id}
						title={m.title}
						date={m.date}
						thumbnail={m.thumbnail}
					/>
				);
			})}
		</div>
	);
}
