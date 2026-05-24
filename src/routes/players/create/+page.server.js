import db from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const actions = {
	createPlayer: async ({ request }) => {

		const formData = await request.formData();

		const player = {
			firstName: formData.get('firstName'),
			lastName: formData.get('lastName'),
			position: formData.get('position'),
			club: formData.get('club'),
			status: formData.get('status'),
			heightCm: Number(formData.get('heightCm')) || null,
			birthDate: formData.get('birthDate') || null,
			marketValueLabel: formData.get('marketValueLabel'),
			preferredFoot: formData.get('preferredFoot')
		};

		await db.createPlayer(player);

		throw redirect(303, '/players');
	}
};
