import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const storedPosition =
	browser && window?.localStorage?.filePosition
		? JSON.parse(window?.localStorage?.filePosition)
		: { x: 0, y: 0 };
export const filePosition = writable<{ x: number; y: number }>(storedPosition);
filePosition.subscribe((value) => {
	if (browser && window?.localStorage) {
		window.localStorage.filePosition = JSON.stringify(value);
	}
});