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

this.config = function (settings) {
  if (typeof(settings.paths) === 'object') {
    uPaths = _.merge(uPaths, settings.paths);
  }
};

this.getConfig = function () {
  return {
    paths: uPaths
  }
};

this.resetConfig = function () {
  uPaths = {};
  queue.reset();
};
