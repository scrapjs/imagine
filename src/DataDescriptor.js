/*
* Data-descriptor concept is similar to the one of expressions, but with data, not with strings.
* You first initializes it, than you can populate it as many times as you wish.
* Reasons to existence of such an object:
* - Parsing happens once, on creating object (it is important for nested and repeated data-descriptors)
* - It is a separate independent module
* - One object populates multiple times
* 
* Shortly, it’s a wrapper over any natural data-type to populate data based on this
* It’s a safety way to create data-populator from any type of object
*/

/* Exemplary data-descriptor
new DataDescriptor({
	siteName: '{{ name }}',
	categories: ['{{ repeat(2,3) }}', {
		id: '{{ index(2) }}',
		name: Person.name,
		regDate: '{{ date(from, to)|naturalday }}'
	}],

	logoColor: function(){ return any("red", "green", "blue") },

	pages: [ '{{ repeat(2,12) }}', Article, News, List ]
})
*/

function DataDescriptor(src, context){
	//context to keep tacidly data related with populating expressions
	this.context = context || extend({}, I, {
		populate: this.populate
	});

	this.model = this.recognize(src, this.context);

		this.stop = 0;
	//console.log("new dd", this.model)
}


DataDescriptor.prototype = {
	dataRegExp: new RegExp([
		I.o.dataDelimiter[0],
		"[ ]*([a-zA-Z_$@][a-zA-Z_$@.0-9]*)[^", I.o.dataDelimiter[0], I.o.dataDelimiter[1], "]*",
		I.o.dataDelimiter[1]
	].join(''), "ig"),

	/*
	* Parses @str, makes model based on it.
	* Returns data-desctiptor parsed
	*/
	parseDescriptor: function(str){

		var dataMatch = str.match(this.dataRegExp);

		var dataRequired = [];

		dataRequired[0] = {
			title: "",
			description: "",
			tagline: "",
			categories: [],
			tags: [],
			pubdate: "",
			author: "Person"
		}

		return dataRequired;
	},

	/*
	* Creates descriptor from any obj passed
	*/
	recognize: function(src){
		//if list is passed - use it as a basis
		if (src instanceof Array){
			return new RepeatExpression(src, this.context);
		}

		//if string passed - parse data-descriptor from it and init model
		else if (typeof src === "string"){
			return new Expression(src, this.context);
		}

		//if simple object is passed - make a list from it
		else if (src instanceof Object){
			return this.recognizeObject(src);
		}

		//otherwise do not create itseld, cause it is the same as plain value
		else {
			return src
		}
	},

	/*
	* If descriptor of format {obj}
	*/
	recognizeObject: function(descriptor){
		if (!descriptor) return descriptor;

		var result = {};

		//Go by keys, handle each properly
		for (var key in descriptor){
			result[key] = this.recognize(descriptor[key])
		}

		return result;
	},

	/*
	*	Known data-types populators
	*/
	populate: function(model){ //TODO: if undefined passed deliberately

		var result = undefined;

		if (arguments.length == 0){
			var model = this.model;
		} else {
			var model = model;
		}
		//console.group("populate datadesc", model)


		if (model instanceof Expression){
			result = model.populate();
		} else if (model instanceof DataDescriptor){
			result = model.populate();
		} else if (model instanceof RepeatExpression){
			result = model.populate();
		} else if (model instanceof Object){
			if (this.stop >= 19){
				console.error("Too big depth of population. Reassert your DataDescriptor")
				return undefined;
			}
			result = this.populateObject(model);
		} else {
			result = model;
		}
		//console.log("pop result", result)
		//console.groupEnd();

		return result
	},
	populateObject: function(obj){
		var result = {};
		this.stop += 1;
		for (var key in obj){
			//console.group("populate object key: `" + key+ "`", obj[key], "result:", result)
			//result[key] = obj[key]
			result[key] = this.populate(obj[key]);
			//console.log("populated obj key `" + key + "` result:", result)
			//console.groupEnd();
		}
		//console.log("popobj result", result)
		return result
	}
}