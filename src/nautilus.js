(function(root, factory) {
    root.nautilus = factory;
}(this, function nautilus() {
	var hasOwn = Object.prototype.hasOwnProperty;

	function extend(a, b, undefOnly) {
		for (var prop in b) {
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
	}

	function fetch(path) {
		console.log(path);
	}

	this.config = function(settings) {
		console.log(settings);
	}

	return extend(fetch.bind(this), this);
}()));