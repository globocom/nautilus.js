(function(root, factory) {
	root.nautilus = factory;
}(this, function nautilus() {
const self = this,
	hasOwn = Object.prototype.hasOwnProperty;

const uPaths = {};
const _ = {
	extends: function(a, b, undefOnly) {
		for (const prop in b) {
			if (hasOwn.call(b, prop)) {
				if (prop !== "constructor" || a !== global) {
					if (b[prop] === undefined) {
						delete a[prop];
					} else if (!(undefOnly && typeof a[prop] !== "undefined")) {
						a[prop] = b[prop];
					}
				}
			}
		}
		return a;
	},
	merge: function(obj1, obj2) {
		const obj3 = {};
		for (const attrname in obj1) {
			obj3[attrname] = obj1[attrname];
		}
		for (const attrname in obj2) {
			obj3[attrname] = obj2[attrname];
		}
		return obj3;
	}
}
const queue = {
	queues: [],
	push: function(lenPaths, fn) {
		this.queues.push({
			paths: lenPaths,
			loaded: 0,
			exec: fn
		});
		return this.queues.length - 1;
	},
	incr: function(queueIndex) {
		const curr = this.queues[queueIndex];
		curr.loaded += 1;
		if (curr.paths <= curr.loaded) {
			if (typeof curr.exec === 'function') {
				curr.exec();
			}
		}
	},
	reset: function() {
		this.queues = [];
	}
}
function loadScript(path, currentQueue) {
	const scr = document.createElement('script');

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

function fetchBuiltIn(arr) {
    fetch.apply(this, arr)
}

function fetch() {
    const args = Array.prototype.slice.call(arguments);
    const paths = args[0];
	if (typeof(paths) === 'string') {
		paths = [paths];
	}

	if (Object.prototype.toString.call(args[1]) === '[object Array]') {
		args[1] = fetchBuiltIn.bind(this, args.slice(1, args.length));
	}

	const q = queue.push(paths.length, args[1]);
	for (const i = 0; i < paths.length; i++) {
		const path = paths[i];
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

return _.extends(fetch.bind(this), this);
}()));