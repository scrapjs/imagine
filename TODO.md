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

* Connect Numeral.js separately as a filter

* Do morphological module

* Do async: imagine.get, imagine.ajax, ...
	* Test passing an data to the response context, and eval that data, like ajax({data:{ view:/map|list/ }}), in order to generate response really based on data passed to request
	* Test deferred data filtering through chain
	* Test on promise object returned within populate
	

* Do not forget about tagTokens

* Catch errors. For example, {{ int(12).add(4) }} has no method add.
	* Or you can not pass some methods or params to context, like 
