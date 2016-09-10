var queue = {
	queues: [],
	push: function(lenPaths, lenLoaded, fn) {
		this.queues.push({
			paths: lenPaths,
			loaded: lenLoaded,
			exec: fn
		});
		return this.queues.length - 1;
	},
	inc: function(queueIndex) {
		var curr = this.queues[queueIndex];
		curr.loaded += 1;
		if (curr.paths <= curr.loaded) {
			if (typeof curr.exec === 'function') {
				curr.exec();
			}
		}
	}
};