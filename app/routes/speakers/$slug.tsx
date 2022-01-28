import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import invariant from 'tiny-invariant';
import { getSpeaker, Speaker } from '~/services/speakers';
import SpeakerLayout from '~/components/speakerLayout';

export const loader: LoaderFunction = async ({ params }) => {
	invariant(params.slug, 'expected params.slug');
	return getSpeaker(params.slug);
};

export default function Speaker() {
	const speaker = useLoaderData<Speaker>();
	return <SpeakerLayout speaker={speaker} />;
}
