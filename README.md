# Nautilus.js

> Async JavaScript loader & dependency manager

## Why?

`- "New is always better"`

Old School - blocks CSS, Images, AND JS


```html
<script src="jquery.js"></script>
<script src="my-jquery-plugin.js"></script>
<script src="my-app-that-uses-plugin.js"></script>
```

Middle School - loads as non-blocking, however if you are predisposed to use an architecture as AMD or commonjs, all other scripts (and this includes plugins) must adapt.

```html

<script>
	require(['jquery'], function($) {
  		console.log($); // function (a,b){return new n.fn.init(a,b)}

  		require(['my-jquery-plugin'], function() {
  			/*
  				If this jquery plugin is a anonymous define, it'll show a error: Mismatched anonymous define() module...
  			*/
  		});
	});
</script>
```

New School - loads as non-blocking too, hower Nautilus.js doesn't care if it's a anonymous define, have unexported module or things like that. 

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

## What's the biggest difference about the [current top script loaders](http://www.creativebloq.com/javascript/essential-javascript-top-five-script-loaders-8122862)?

Nautilus can define namespaces to script paths/links and you can manage easily.

