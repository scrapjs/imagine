* Generate data based on descriptors
* Make filters
* Make feed-player work
* Make letters generator

* Expressions
	* Recognize things like ., [^], \b
	* Replace keywords like alnum etc
	* Make real regexps work fully

* Swig behaviour
	* Make swig API-compliable filters and more


* TODO: save specificity of generated data type and get access to any property written
E.g. {{ noun }} → Noun.plural = true, then {{ verb|with(" noun: \d1.plural ") }}

* Separated Filter packs: swig, django, formatter etc
* Separated DataSources packs
* Separated Languages packs

* Make minified version work