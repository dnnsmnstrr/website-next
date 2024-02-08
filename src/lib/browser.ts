import { debugLog } from '$lib/stores/app';

export function closeWindow() {
  debugLog('Attempting to close window');
	window.close();
}

export function isBrowserInFullscreen() {
  const isFullscreen = document.fullscreenElement
  // debugLog(`Browser is ${isFullscreen ? 'not' : ''} in fullscreen mode`)
	return isFullscreen
}

export function toggleFullscreen() {
	var elem = document.documentElement;
	if (document.fullscreenEnabled && elem.requestFullscreen) {
		if (isBrowserInFullscreen() && document.exitFullscreen) {
			debugLog('Exiting fullscreen');
			document.exitFullscreen();
		} else {
			debugLog('Entering fullscreen');
			elem.requestFullscreen();
		}
	} else {
		debugLog('Your browser cannot use fullscreen right now');
	}
}