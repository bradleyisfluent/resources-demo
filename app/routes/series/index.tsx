import { Link, useLoaderData } from 'remix';
import { getMessages, Message } from '~/services/messages';

export default function Home() {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}
