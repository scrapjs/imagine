/*
* Data-descriptor object is in charge of API for data-descriptors
* Why do I need a separate DataDescriptor object and not just couple of methods?
* - Parsing happens once on creating object
* - Separate independent module
* - Populate multiple times of one object
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
	create: function(srcObject){
		//check if parsed another DataDescriptor
		if (srcObject instanceof DataDescriptor){
			this = srcObject;
		}

		//if passed array object
		else if (srcObject instanceof Array){
			this.model = srcObject;
		}

		//if string passed needed to parse data-descriptor
		else if (typeof srcObject === "string"){
			this.model = this.getDataDescriptor();
		}

		//if passed simple object
		else {
			this.model = [srcObject]
		}

	},

	dataRegExp: new RegExp([
		I.o.dataDelimiter[0],
		"[ ]*([a-zA-Z_$@][a-zA-Z_$@.0-9]*)[^", I.o.dataDelimiter[0], I.o.dataDelimiter[1], "]*",
		I.o.dataDelimiter[1]
	].join(''), "ig"),

	/*
	* Parses template string, makes model based on it.
	* Returns data-desctiptor parsed
	*/
	getDataDescriptor: function(str){

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
	* Fill model with random data
	*/
	populate: function(descriptor){
		if (descriptor instanceof Array){
			return this.populateList(descriptor)
		} else if (typeof descriptor === "string") {
			return this.expression(descriptor)
		} else {
			return this.populateDescriptor(descriptor)
		}
	},

	/*
	* If descriptor of format ['{{ repeat }}'?, ...]
	*/
	populateList: function(listDescriptor){

		//make repeating context to have access to vital variables for current level
		var repeatStr ='',
			repeatSubjects,
			levelContext = {
				//random(1,4)
				repeat: function(a, b, c){
					var min = 1, max = 1, randomly = false;
					if (b === undefined || b === true || b === false && a !== undefined){
						max = a;
						min = a;
						randomly = !!b;
					} else if (b !== undefined && a !== undefined) {
						max = b;
						min = a;
						randomly = !!c;
					}

					return {
						times: int(min, max),
						randomly: randomly
					}
				}
			}

		//match if first item is {{ repeat }} statement
		//define repeat expression and subjects properly
		var repeatMatch, restArgs;
		if (typeof listDescriptor[0] === 'string' && (repeatMatch = listDescriptor[0].match(/\{\{[ ]*repeat[ \(\),0-9]*\}\}/))){
			repeatStr = listDescriptor[0];
			repeatSubjects = Array.prototype.slice.call(arguments, 1);
		} else {
			repeatStr = '{{ repeat }}';
			repeatSubjects = Array.prototype.slice.call(arguments)
		}

		//set context for expression
		var repeatEx = new Expression(repeatStr, {
			context: levelContext
		});

		//calc repeatTimes and randomly (passed to context)
		var repeatSettings = repeatEx.populate();

		//Make repeat sequence (resulting populated list)
		var resultList = [], length = repeatSubjects.length || 1;
		for (var i = 0; i < repeatSettings.times; i++){
			resultList.push(this.populateDescriptor( repeatSettings.randomly ? any(repeatSubjects) : repeatSubjects[i % length] ))
		}

		//TODO: think up `randomly` issue
		//TODO: make up passing index to populateDescriptor
	},


	/*
	* If descriptor of format {obj}
	*/
	populateDescriptor: function(descriptor){
		//Go by keys, handle each properly

		//Track previously added subjects to separate indexes
	}
}