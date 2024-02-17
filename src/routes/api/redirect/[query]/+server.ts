import { redirect } from '@sveltejs/kit';
import { redirects } from "../redirects";
import { getRedirect } from '$lib/redirect';

export async function GET({ params }) {
  console.log(params);

  const foundRedirect = getRedirect(params.query, redirects)
  throw redirect(302, foundRedirect)
}