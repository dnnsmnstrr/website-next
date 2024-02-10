import { browser } from '$app/environment';
import { randomNumber } from '$lib/helper';
import { writable } from 'svelte/store';
import { debugLog } from './app';

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

export function initializeFile(fileSize = 50) {
  if (browser) {
    const windowSize = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    const padding = 20
    const randomX = randomNumber(padding, windowSize.width - fileSize - padding)
    const randomY = randomNumber(padding, windowSize.height - fileSize - padding);
    debugLog("Initializing file to random position", randomX, randomY);
    filePosition.set({
			x: randomX,
			y: randomY,
		});
  }
}