# Nautilus.js

> Async JavaScript loader & dependency manager in ~1kb (600B gziped)

[![Coverage Status](https://coveralls.io/repos/github/raphamorim/nautilus.js/badge.svg?branch=master)](https://coveralls.io/github/raphamorim/nautilus.js?branch=master)

Used by [G1's globocom](http://g1.globo.com), [Jusbrasil](http://www.jusbrasil.com.br/home)

## Why?

#### Old School

blocks CSS, Images and JavaScript.


```html
<script src="jquery.js"></script>
<script src="my-jquery-plugin.js"></script>
<script src="my-app-that-uses-plugin.js"></script>
```

#### Middle School

loads as non-blocking, however one has to use an API definition as AMD or commonjs. This affects all the other scripts (including plugins).

```html
<!-- AMD LOADER EXAMPLE -->
<script>
require(['jquery'], function($) {
    console.log($); // function (a,b){return new n.fn.init(a,b)}

    require(['my-jquery-plugin'], function() {
      /*
        If jquery plugin has an anonymous define, throw an error: Mismatched anonymous define() module...
      */
    });
});
</script>
```

#### New School

loads as non-blocking too, however Nautilus.js doesn't care if it's an anonymous define, has unexported module or things like that.

```html
<script>
	nautilus.config({
		paths: {
			'jquery': 'libs/jquery.js',
			'jquery.nanoscroller': 'libs/jquery-nanoscroller.js',
			'waterfall': 'http://cdnjs.cloudflare.com/ajax/libs/waterfall.js/1.0.2/waterfall.min.js'
		}
	});

	nautilus(['jquery', 'waterfall'], ['jquery.nanoscroller'], function() {
		console.log($); // function (a,b){return new n.fn.init(a,b)}
		console.log(typeof($.fn.nanoScroller)); // 'function'
	});
</script>
```

#### What's the biggest difference about the [current top script loaders](http://www.creativebloq.com/javascript/essential-javascript-top-five-script-loaders-8122862)?

Nautilus can define namespaces to script paths/links and you can manage easily. Besides 7~20x more lighter.

## Getting

First of all, get Nautilus.js using [Download Option](https://github.com/raphamorim/nautilus.js/archive/master.zip) or via package manager.

To get using [Bower](http://bower.io) just run this command:

```sh
bower install nautilusjs
```

Or get using NPM just run this command:

```sh
npm install nautilusjs
```

## Usage

To define specified `paths`, you must use the config method:

```js
nautilus.config({
    paths: {
        'jquery': 'libs/jquery.js',
        'waterfall': 'http://cdnjs.cloudflare.com/ajax/libs/waterfall.js/1.0.2/waterfall.min.js'
    }
});
```

To start scripts asynchronous load:

```js
nautilus(['jquery', 'waterfall'], function() {
    console.log($); // function (a,b){return new n.fn.init(a,b)}
    console.log(typeof(waterfall)); // 'function'
});
```

### Optional parameters
You can also set `origins` for your relative URLs, it will concatenate the origin and the path and try to load once, so if the download fails in the first domain, it will try to download in the second and so on.
```js
nautilus.config({
  origins: ['https://public.cdn.com', 'https://private.cdn.com', 'https://s3.com'],
  paths: { jquery: '/libs/jquery.min.js' }
});
nautilus(['jquery']);
```

With this it will request the script file in the following URLs:
1. `https://public.cdn.com/libs/jquery.min.js`
2. `https://private.cdn.com/libs/jquery.min.js`
3. `https://s3.com/libs/jquery.min.js`
4. `/libs/jquery.min.js`


## Browser Support

| <img src="http://raphamorim.io/assets/images/browser-support/chrome.png" width="100px" height="100px" alt="Chrome logo"> | <img src="http://raphamorim.io/assets/images/browser-support/firefox.png" width="100px" height="100px" alt="Firefox logo"> | <img src="http://raphamorim.io/assets/images/browser-support/ie.png" width="100px" height="100px" alt="Internet Explorer logo"> | <img src="http://raphamorim.io/assets/images/browser-support/opera.png" width="100px" height="100px" alt="Opera logo"> | <img src="http://raphamorim.io/assets/images/browser-support/safari.png" width="100px" height="100px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|
| 35+ ✔ | 38+ ✔ | 9+ ✔ | 29+ ✔ |  8+ ✔ |

## Credits

Made by [@raphamundi](https://twitter.com/raphamundi) and awesome [contributors](https://github.com/raphamorim/nautilus.js/graphs/contributors)

License: MIT
