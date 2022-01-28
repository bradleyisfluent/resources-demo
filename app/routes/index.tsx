import { Heading } from '@chakra-ui/react';
import { Link } from 'remix';

export default function Index() {
	return (
		<>
			<Heading>Messages</Heading>
			<Link to={'/messages'}>All Messages</Link>
		</>
	);
}
