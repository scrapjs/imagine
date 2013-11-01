## Notes
* ! not to create huge list of classes copying schema.org but create data-providers (like faker does) and dictionary defining what data is there what synonyms it has and how fields are generated. So to use schema.org just load dict. Meantime you can add your own dict.
* Locales should be launchable from browser like `<script src="../lib/faker/en_EN.js"></script>`
* Make different tempate engines compilers, call them like improvise-django.js, improvise-underscore.js etc
* Check whether it is offline (through options) and insert stub image in that case.
* Make random-image generator (think how)


## Name ideas:

* improvise.js
	* x get-some-life.js
	* x magic.js
* magic-data.js
* zombie-data.js
* cancer.js
	* x live.js
	* x live-data.js
	* x resurrector.js
	* x illusory-data.js
	* x illusionist.js
	* x illusion.js

## Description

Proccess of making site usually similar to this:

1. Do design or sketches
2. Do markup 
3. Do fake content
4. Do CSS
5. Check how does it look: if it’s bad, go 2
6. Implement templates from markup
…

I’d feel better doing this:

1. Do design or sketches
2. Implement templates *filling with random data automatically*
3. Correct CSS iteratively, each time having new content
…

With improvise.js I no more need to make fake content and markup. I just do the templates straight away.

## Features

* Regexp-like expressions to generate data
* schema.org compliand data structore
* Defining own dictionaries to generate data

## Projects use improvise.js

* Feed-player



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


## Custom data-types

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


## Principle

Improvise.js tries to fill template in page with data obtained either from interner or through faker.