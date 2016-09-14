# Nautilus.js

> Async JavaScript loader & dependency manager in ~1kb

[![Coverage Status](https://coveralls.io/repos/github/raphamorim/nautilus.js/badge.svg?branch=master)](https://coveralls.io/github/raphamorim/nautilus.js?branch=master)

## Why?

`- "New is always better", Barney Stinson`

**Old School**
***
blocks CSS, Images and JavaScript.


```html
<script src="jquery.js"></script>
<script src="my-jquery-plugin.js"></script>
<script src="my-app-that-uses-plugin.js"></script>
```

**Middle School**
***
loads as non-blocking, however one has to use an API definition as AMD or commonjs. This affects all the other scripts (including plugins).

```html
<!-- AMD LOADER EXAMPLE -->
<script>
require(['jquery'], function($) {
    console.log($); // function (a,b){return new n.fn.init(a,b)}

    require(['my-jquery-plugin'], function() {
      /*
        If jquery plugin have an anonymous define, throw an error: Mismatched anonymous define() module...
      */
    });
});
</script>
```

**New School**
***
loads as non-blocking too, however Nautilus.js doesn't care if it's an anonymous define, have unexported module or things like that.

```html
<script>
	nautilus.config({
		paths: {
			'jquery': 'libs/jquery',
			'jquery.nanoscroller': 'libs/jquery-nanoscroller',
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

Nautilus can define namespaces to script paths/links and you can manage easily.

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

To define specified paths, you must use the config method:

```js
nautilus.config({
    paths: {
        'jquery': 'libs/jquery',
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
