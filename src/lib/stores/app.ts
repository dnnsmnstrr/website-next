import { get, writable } from 'svelte/store';

export const isCommandActive = writable(false);
export const debug = writable(false);

export function debugLog(...args: any[]) {
  const isDebugActive = get(debug)
  if (isDebugActive) {
    console.log(...args);
  }
}