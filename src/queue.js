const queue = {
  queues: [],
  push: function (lenPaths, fn) {
    this.queues.push({
      paths: lenPaths,
      loaded: 0,
      exec: fn
    });
    return this.queues.length - 1;
  },
  incr: function (queueIndex) {
    const curr = this.queues[queueIndex];
    curr.loaded += 1;
    if (curr.paths <= curr.loaded) {
      if (typeof curr.exec === 'function') {
        curr.exec();
      }
    }
  },
  reset: function () {
    this.queues = [];
  }
};
