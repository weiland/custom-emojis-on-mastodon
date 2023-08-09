import type { PageLoad } from "./$types";

export const load = (async ({ url }) => {
	const hostname = url.searchParams.get('hostname');
	return { hostname };

}) satisfies PageLoad;

export const prerender = true;
