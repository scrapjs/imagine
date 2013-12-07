/**
* {{ Data.Type }} token
* @constructor
* @extends Token
*/
function DataToken(){
	this._constructor.apply(this, arguments)
}
extend(DataToken.prototype, Token.prototype, {
	maxRecursionDepth: 5,

	techSymbols: "|,()",
	parse: function(str){
		//console.group("dataToken: ", str)

		//Get rid of brackets
		str = str.slice(2, -2).trim();

		this.dataString = str;

		//escape all stringy tech chars to avoid interference in parsing
		str = escapeWithin(str, "''", '""')

		//Split components: source|filter1|filter2...
		var sequence = str.split('|');
		var source = unescape(sequence[0]).trim();
		var filters = sequence.slice(1);

		//Set up vital variables: source
		this.source = recognizeParam(source);

		//And list of filter callers
		this.filters = [];
		for (var i = 0; i < filters.length; i++){
			this.filters.push(new Filter(unescape(filters[i])))
		}

		//console.log("Datatoken source: ", this.source)
		//console.log("Datatoken filters: ", this.filters)

		//recognize function to call within context

		//console.groupEnd();
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

	populate: function(ctx, multiplier){
		//console.group("populate datatoken:", this.toString(), " with context", ctx)
		var result,
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
			result = this.getData(ctx);
			//console.groupEnd();
			return result;
		} else {
			for (var i = 0; i < times; i++){
				result += this.getData(ctx);
			}
		}

		//console.log("Populated:", result)
		//console.groupEnd();

		return result;
	},

	getData: function(ctx){
		var src = undefined,
			result;
		//Makes initial source
		//console.group("data token getdata:", this.source, "with ctx", ctx)
		if (this.source instanceof CallSequence) {
			result = this.source.makeCall(ctx);
		} else {
			result = this.source;
		}
		//console.groupEnd()

		//Goes through all filters registered, does CallSequence calls, if needed
		for (var i = 0; i < this.filters.length; i++){
			result = this.filters[i].process(result, ctx);
		}

		return result;
	}
});