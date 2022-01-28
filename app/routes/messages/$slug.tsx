import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { getMessage, Message } from '~/services/messages';
import invariant from 'tiny-invariant';
import MessageLayout from '~/components/messageLayout';

export const loader: LoaderFunction = async ({ params }) => {
	invariant(params.slug, 'expected params.slug');
	return getMessage(params.slug);
};

export default function Message() {
	const message = useLoaderData<Message>();
	return <MessageLayout message={message} />;
}
