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

* Automatic declinator of words (Name_case etc)

* Automatic middle name generator (based on firstname)
* Transcriptor

* Think how to unclude all that local stuff to project correctly.
	* Besides, there are JSON-generator primitives and Data-schema objects.
	* So the same about filters. Now it’s a mess.

	* THe main question is how to provide access to providers fromwithin CallSequence

* Cache every data type: expression, repeatExpression, callSequence