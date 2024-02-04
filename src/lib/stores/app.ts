import { writable } from 'svelte/store';

export const isCommandActive = writable(false);
export const debug = writable(false);