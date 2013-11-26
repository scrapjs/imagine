/*
* Data-descriptor concept is similar to the one of expressions, but with data, not with strings.
* You first initializes it, than you can populate it as many times as you wish.
* Reasons to existence of such an object:
* - Parsing happens once, on creating object (it is important for nested and repeated data-descriptors)
* - It is a separate independent module
* - One object populates multiple times
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

function DataDescriptor(){
	this.create.apply(this, arguments)
}


DataDescriptor.prototype = {
	/*
	* 
	* Possible srcObject: string (i.e. expression), list, object or primitive
	*/
	create: function(srcObject, context){
		/*
		* this.model is a list of objects to generate.
		* List is used conveniently, due to compliance with JSON-generator resulting data
		*/
		this.context = context || {
			repeat: repeat,
			index: index,
			populate: this.populate
		};

		this.model = this.recognize(srcObject, this.context);
		this.context.model = this.model;

		//console.log("new dd", this.model)

	},

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
	recognize: function(obj, context){
		//check if parsed another DataDescriptor - make self refere to the origin
		if (obj instanceof DataDescriptor){
			return obj;
		}

		//if list is passed - use it as a basis
		else if (obj instanceof Array){
			return this.recognizeList(obj, context);
		}

		//if string passed - parse data-descriptor from it and init model
		else if (typeof obj === "string"){
			return new Expression(obj, {context: context});
		}

		//if simple object is passed - make a list from it
		else if (obj instanceof Object){
			return this.recognizeDescriptor(obj, context);
		}

		//otherwise do not create itseld, cause it is the same as plain value
		else {
			return obj
		}
	},

	/*
	* If descriptor is of format ['{{ repeat }}'?, ...]
	*/
	recognizeList: function(listDescriptor, context){
		this.context = extend(this.context, context, 

		//change model and repeat subjects of parent list context
		{
			lastIndex: undefined,
			repeatSubjects: [],
			model: this.model
		});

		//match if first item is `{{ repeat }}` statement
		//define repeat expression and subjects properly
		var repeatMatch, restArgs, repeatStr;
		if (typeof listDescriptor[0] === 'string' && (/\{\{[ ]*repeat[ \(\),0-9]*\}\}/.test(listDescriptor[0]))){
			repeatStr = listDescriptor[0];
			restArgs = listDescriptor.slice(1);
		} else {
			repeatStr = '{{ repeat }}';
			restArgs = listDescriptor
		}

		//recognize repeating subjects as data-desctiptors, in order to populate them multiple times
		for (var i = 0; i < restArgs.length; i++){
			this.context.repeatSubjects.push(this.recognize(restArgs[i], this.context))
		}

		//console.log("list", this.context.repeatSubjects)

		//set context for expression
		var repeatEx = new Expression(repeatStr, {
			context: this.context
		});

		return repeatEx;
	},


	/*
	* If descriptor of format {obj}
	*/
	recognizeDescriptor: function(descriptor, context){
		if (!descriptor) return descriptor;

		var result = {};
		var ctx = extend({}, context)
		delete ctx.repeat;

		//Go by keys, handle each properly
		for (var key in descriptor){
			if (typeof descriptor[key] === "string"){
				result[key] = new Expression(descriptor[key], {context:ctx})
			} else if (descriptor[key] instanceof Array){
				result[key] = this.recognizeList(descriptor[key], context)
			} else if (descriptor[key] instanceof Object) {
				result[key] = this.recognizeDescriptor(descriptor[key], context);
			} else if (typeof descriptor[key] === "function") {
				result[key] = descriptor[key];
			} else {
				result[key] = descriptor[key];
			}
		}

		return result;
	},



	/*
	* Populate self
	*/
	populate: function(model){
		if (arguments.length === 0) {
			model = this.model
		}
		console.log("populate", model)

		if (model instanceof Expression){
			return model.populate();
		} else if (model instanceof Array){
			var result = [];
			for (var i = 0; i < model.length; i++){
				result.push(this.populate(model[i]))
			}
			return result
		} else if (model instanceof Object){
			var result = {}
			//console.group("obj populate")
			for (var key in model){
				result[key] = this.populate(model[key]);
			}
			//console.groupEnd
			return result;
		} else {
			return model;
		}
	}
}