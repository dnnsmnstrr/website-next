import { debug, debugLog } from '$lib/stores/app';

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

export function printPage() {
  debugLog('Opening print dialog');
  window.print();
}

export function bookmark(title: string, url: string) {
  debugLog('Bookmarking', title, url);
	if (window?.sidebar) {
		// Firefox
		window.sidebar.addPanel(title, url, '');
	} else if (window.opera && window.print) {
		// Opera
		var elem = document.createElement('a');
		elem.setAttribute('href', url);
		elem.setAttribute('title', title);
		elem.setAttribute('rel', 'sidebar');
		elem.click(); //this.title=document.title;
	} else if (document.all) {
		// ie
		window.external.AddFavorite(url, title);
	}
}