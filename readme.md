# Imagine.js - tool for imaginary data*

<small>* — WIP</small>

1. Populate regexp-like syntax:
	```js
	imagine(/https?:\/\/(?:www.)?(?:google.com|yandex.ru)/);
	```

2. Populate [json-generator](http://www.json-generator.com/) notation:
	```js
	imagine([
		'{{repeat(5, 7)}}',
		{
			type: 'article',
			id: '{{ index }}',
			isPublished: '{{ bool }}',
			…
		}
	])
	```

3. Use set of primitives
	```js
	imagine.int(0,10);
	imagine.float(-23.12,100.12);
	imagine.any("a", "b", "c");
	imagine.bool();
	…
	```

4. Use localized data-providers
	…


## Motivation

My proccess of making site was similar to:

1. Paint design or sketches
2. Do markup (HTML)
3. Fill markup with some fake content
4. Write styles
5. Check how does everything look: if it’s bad, go to 2.
6. Implement templates code based on the markup
…

I'd feel better doing this:

1. Paint design or sketches
2. Implement templates. They are filled automatically with random data.
3. Write CSS iteratively, testing it on different content
…

It’s main goal of imagine.js.

<!--## Projects using imagins.js

* Feed-player
* Letter generator-->