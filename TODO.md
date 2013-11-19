* Gruntify
* Make finite methods and providers
	* Generate data based on descriptors
* Make filters
* Make feed-player work

* Expressions
	* Recognize things like ., [^], \b
	* Replace keywords like alnum etc
	* Make real regexps work

* Swig behaviour
	* Make swig API regarding data-source:
		* 'string', object.properties, and['another-way'], fil|tered, customFun()|ctioned(), 123.456
	* Make swig API-compliable filters and more


* TODO: save specificity of generated data type and get access to any property written
E.g. {{ noun }} → Noun.plural = true, then {{ verb|with(" noun: \d1.plural ") }}