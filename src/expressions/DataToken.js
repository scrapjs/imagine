/*
	{{ Data.Type }} token
*/
function DataToken(){
	this._constructor.apply(this, arguments)
}
extend(DataToken.prototype, Token.prototype, {
	maxRecursionDepth: 5,

	techSymbols: "|,()",
	parse: function(str){
		console.group("dataToken: ", str)

		//Get rid of brackets
		str = str.slice(2, -2).trim();

		this.dataString = str;

		//escape all stringy tech chars to avoid interference in parsing
		str = escapeWithin("''", str)
		str = escapeWithin('""', str)

		//Split components: source|filter1|filter2...
		var sequence = str.split('|');
		var source = unescape(sequence[0]).trim();
		var filters = sequence.slice(1);

		//Set up vital variables
		this.source = new DataSource(source);
		
		this.filters = [];
		for (var i = 0; i < filters.length; i++){
			this.filters.push(new Filter(unescape(filters[i])))
		}

		console.log("Datatoken source: ", this.source)
		console.log("Datatoken filters: ", this.filters)

		//recognize function to call within context

		console.groupEnd();
	},

	toString: function(){
		return "{{ " + this.dataString + " }}" + this.renderMultiplier();
	},

	toJSON: function(){
		return {
			token: "DataToken",
			source: this.source,
			filters: this.filters,
			multiplier: this.multiplier
		}
	},

	populate: function(multiplier){
		var result = "",
			m = multiplier || this.multiplier,
			times = int(m[0], m[1], true);

		//TODO
		//Read data from known place, like language.alphabete
		//Read data from unknown place, like email (search throughout the models)
		//Eval functions, if function matched, like {{ abc(12) }}
		//Choose any from array, if data is array (and eval each element as an expression)
		//Choose any key, if property contains keys
		//Eval expression, if it is string
		//Apply replacements, if there are any data-elemens nearby
		//The same way, define environment to call it within. It is needed to call things like {{ index(12) }}, {{ repeat(23,25) }}
		//Prevent too long recursive calls: just output last as empty string

		//TODO: apply context to the call of function, if it is 
		if (times === 1){
			return this.getData();
		} else {
			for (var i = 0; i < times; i++){
				result += this.getData();
			}
		}

		console.log("Populated:", result)

		return result;
	},


	getData: function(){
		//Makes initial source
		var result = this.source.getData();

		//Goes through all filters registered, does DataSource calls, if needed
		for (var i = 0; i < this.filters.length; i++){
			result = this.filters[i].process(result);
		}

		return result;
	}
});