import { disemvowel } from "./helper";

export const FIRST_NAME = 'Dennis';
export const LAST_NAME = 'Muensterer';
export const NAME_ABBREVIATION = FIRST_NAME.slice(0, 1) + LAST_NAME.slice(0, 1);
export const OWNER_NAME = FIRST_NAME + ' ' + LAST_NAME;
export const WEBSITE_NAME = LAST_NAME.toLowerCase() + 'OS';
export const USERNAME = 'dennismuensterer';
export const EMAIL_PROVIDER = 'gmail';
export const EMAIL = `${USERNAME}@${EMAIL_PROVIDER}.com`;
export const USERNAME_LONG = USERNAME;
export const USERNAME_SHORT = disemvowel(USERNAME_LONG);
export const API_URL = 'https://dnnsmnstrr.vercel.app/';
export const DEFAULT_URL = 'https://muensterer.tech/';

export const links: Record<string, string> = {
	yat: 'https://y.at/🤖💻📱⌚🎧',
	spotify: 'https://open.spotify.com/user/' + USERNAME_LONG,
	github: 'https://github.com/' + USERNAME_SHORT,
	instagram: 'https://www.instagram.com/' + USERNAME_SHORT,
	twitter: 'https://twitter.com/' + USERNAME_SHORT,
	x: 'https://x.com/' + USERNAME_SHORT,
	mastodon: 'https://mastodon.social/@' + USERNAME_SHORT,
	facebook: 'https://facebook.com/' + USERNAME_LONG,
	linkedin: 'https://www.linkedin.com/in/' + USERNAME_LONG,
	youtube: 'https://www.youtube.com/user/' + USERNAME_LONG,
	telegram: 'https://t.me/' + USERNAME_SHORT,
	bereal: 'https://bere.al/' + USERNAME_SHORT,
	tiktok: 'https://www.tiktok.com/@' + USERNAME_SHORT,
	paypal: 'https://www.paypal.com/paypalme/' + USERNAME_LONG,
	kickstarter: 'https://www.kickstarter.com/profile/' + USERNAME_LONG,
  steam: 'https://steamcommunity.com/id/' + USERNAME_SHORT,
  routinehub: 'https://routinehub.co/user/' + USERNAME_SHORT,
	imdb: 'https://www.imdb.com/user/ur31201407',
};

export const descriptions = [
  { name: '🤖💻📱⌚🎧', href: links.yat },
	'💻 Software Developer',
	'🤖 Builder of Things',
	'📱 Coder of Apps',
	'🍕 Pizza lover',
	{ name: '🎧 Music enthusiast', href: links.spotify}
];

export const defaultColors = {
	light: {
		primary: '222.2 47.4% 11.2%',
		background: '0 0% 100%'
	},
	dark: {
		primary: '0 0% 98%',
		background: '240 10% 3.9%'
	}
};