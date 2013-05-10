# Improvise.js makes templates alive

WIP

<!--Caption ideas:

* improvise.js
* get-some-life.js
* magic.js
* magic-data.js
* live.js
* live-data.js
* resurrector.js
* illusory-data.js
* illusionist.js
* illusion.js-->

My proccess of making site looks something like this:

1. Do design or sketches
2. Do markup 
3. Do fake content
4. Do CSS
5. Check how does it look: if it’s bad, go 2
6. Implement templates from markup
…

I’d better feel like doing this way:

1. Do design or sketches
2. Implement templates *filling with random data automatically*
3. Correct CSS iteratively, each time having new content
…

With improvise.js I no more need to make fake content and markup. Just do the templates right away.


## Getting started

1. Write [django-complaint](http://paularmstrong.github.io/swig/docs/#browser) templates:
```html
<body>
	<h1>Hello, {{ name }}!</h1>
	<p>{{ intro }}</p>

	{% for post in posts %}
		<article>
			<header>{{ post.title }}</header>
			{{ post.content }}
			{{ post.author }} | {{ post.date }}
		</article>
	{% endfor %}
</body>
```

2. Get life:
```html
<script src="improvise.js"/>
```

## Common motives

All [schema.org](http://schema.org) entities are supported.


## Custom motives

If you’re faced with custom data needed, you have to describe "data" property in options:
```html
<script>
var improvise = {
	data: {
		post: {
			title: "header",
			author: "name",
			pubdate: "date < 01.02.1987"
		},
		sitetitle: "caption"
	}
}
</script>
<script src="improvise.js"></script>
```

## Data types

Standart data supplied (taken from schema.org and other faker implementations)

<dl>
	<dt>Person ~ user, man, personage</dt>
	<dd>Basic person info
		<dl>
			<dt>Person.name ~ uname, username : string</dt>
			<dd>
				<output>JSmith</output>
			</dd>
		</dl>
		<dl>
			<dt>Person.age ~ uname, username : jckEnnd</dt>
			<dd></dd>
		</dl>
		<dl>
			<dt>Person.bdate ~ birth_date : jckEnnd</dt>
			<dd></dd>
		</dl>
		<dl>
			<dt>Person.gender ~ sex : jckEnnd</dt>
			<dd></dd>
		</dl>
		<!--<a href="#" class="active">Example (refresh)</a>
		<output>
			personage example json
		</output>-->
	</dd>

	<dt>
		Post ~ article
	</dt>
	<dd>
	</dd>

	<dt>
		Item
	</dt>

	<dt>
		Address
	</dt>
</dl>


## Options

```json
{
	locale: "ru_RU,
	data: {data description},
	live: false
}
```


## Pronciple

Improvise.js tries to fill template in page with data obtained either from interner or through faker.

## TODO & notes

* Locales should be launchable from browser like `<script src="../lib/faker/en_EN.js"></script>`
* Make through ES6 compiler