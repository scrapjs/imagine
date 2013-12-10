## Notes
* ! not to create huge list of classes copying schema.org but create data-providers (like faker does) and dictionary defining what data is there what synonyms it has and how fields are generated. So to use schema.org just load dict. Meantime you can add your own dict.
* Locales should be launchable from browser like `<script src="../lib/faker/en_EN.js"></script>`
* Make plain primitives, do not hide functions behind providers. There are not that much of diverity to create procider namespaces.
* Calling context shouldn’t be predefined. Pass it only on populate. By the fact, it’s a data-object passed to template engine, the same as in any other templating engine.
* Language tools have to be separated from the rest part of project: you don’t have to connect all the *imagine.js* in order to use only language tools, like  declinator.
	* There have to be only lemmas and a way to use real language classes: /{{ Noun("лемма")|case("prepositional") }}/



## Ideas
* Think about splitting Expressions to separate module


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
* imagine
	+ imagine("expression")
	+ imagine(dataDescriptor)
	+ imagine.email()
	+ imagine.number()
	+ imagine.person({ age: [31,45] })
	+ imagine.expression()

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


## Getting started

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

	<script src="improvise.js"/>
</body>
```

Just reload page couple of times.


## Options

```json
{
	locale: "ru_RU,
	data: {data description},
	live: false
}
```


## Expressions syntax

Expressions needed for generating string-data according to the rules. Uses syntax mix of RegExp with moustache templates.
Example: `(?:(greg).(semenov)|\\2.\\1)@(gmail|yahoo).com`



## Data-descriptors syntax

Data-descriptors objects needed for generating JSON objects.

* They are the objects describing data-scheme structure.
* Requirements
	* `{ "property": Article.name }`
	* `{ "property": Article }`
	* `property: "some_[Ee]xpression"`
	* At the end any of assignments has to point to data providers: `property: Provider.field`
	* Array of different objects with numeric intervals, like `[Article, News, List, Article]`
	* Specific function `prop: function(){ return [Article, Article]}`
	* Possible to be set whether as an object or a ready model `prop: Article`, `prop: {...another descriptor...}`
	* Specific data types like `prop: SpecialType`
* Parsing capabilities: 
	* Determine which property does the data-word from raw HTML belongs to (each propery must have synonims or dict probably) 


Notation is a mix of json-generator and expression notation.

```json
{
	siteName: '{{ name }}',
	categories: ['{{ repeat(2,3) }}', {
		id: '{{ index(2) }}',
		name: Person.name,
		regDate: '{{ date(from, to)|naturalday }}'
	}],

	logoColor: function(){ return any("red", "green", "blue") },

	pages: [ '{{ repeat(2,12) }}', Article, News, List ]
}
```

## Functions

	`index(startFrom)`
	Inserts index starting from integer passed.
	If more than one model involved in repeating proccess, empty argument is considered as prolongued syntax, non-empty argument is considered as new index.
	['{{ repeat(5)}}', '{{ index(2) }}', '{{ index }}']


## Projects use improvise.js

* Feed-player
