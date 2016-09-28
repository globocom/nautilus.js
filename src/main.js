function loadScript(path, currentQueue) {
	var scr = document.createElement('script');

	scr.type = 'text/javascript';
	scr.onload = handleLoad;
	scr.async = true;
	scr.onreadystatechange = handleReadyStateChange;
	scr.onerror = handleError;
	scr.src = path;
	document.head.appendChild(scr);

	function handleLoad() {
		queue.incr(currentQueue);
	}

	function handleReadyStateChange() {
		if (scr.readyState === 'complete') {
			handleLoad();
		}
	}

	function handleError() {
		console.warn(
			'[nautilus] occurred an error while fetching',
			path
		);
	}
}

function fetch(paths, depsOrFn, fn) {
	if (typeof(paths) === 'string') {
		paths = [paths];
	}

	if (Object.prototype.toString.call(depsOrFn) === '[object Array]') {
		depsOrFn = fetch.bind(this, depsOrFn, fn);
	}

	var q = queue.push(paths.length, depsOrFn);
	for (var i = 0; i < paths.length; i++) {
		var path = paths[i];
		loadScript(uPaths[path] || path, q);
	}
}

this.config = function(settings) {
	if (typeof(settings.paths) === 'object') {
		uPaths = _.merge(uPaths, settings.paths);
	}
}

this.getConfig = function() {
	return {
		paths: uPaths
	}
}

this.resetConfig = function() {
	uPaths = {};
	queue.reset();
}