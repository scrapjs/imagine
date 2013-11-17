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
		str = str.replace(stringRE, function(){
			return arguments[0][0] + escape(arguments[0].slice(1,-1)) + arguments[0][arguments[0].length - 1]
		})

		//Split components: source|filter1|filter2...
		var sequence = str.split('|');
		var source = unescape(sequence[0]);
		var filters = sequence.slice(1);

		console.log(source)
		console.log(filters)

		//TODO: save specificity of generated data type and get access to any property written
		//E.g. {{ noun }} → Noun.plural = true, then {{ verb|with(" noun: \d1.plural ") }}

		//recognize function to call within context

		console.groupEnd();
	},

	toString: function(){
		return "{{ " + this.dataString + " }}" + this.renderMultiplier();
	},

	toJSON: function(){
		return {
			token: "DataToken",
			dataType: this.dataType,
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
		//The same way, define environment to call it within. It needed to call things like {{ index(12) }}, {{ repeat(23,25) }}
		//Prevent too long recursive calls: just output last as empty string

		//TODO: apply context to the call of function, if it is 
		if (times === 1){
			return this.getData();
		} else {
			for (var i = 0; i < times; i++){
				result += this.getData();
			}
		}

		return result;
	},


	getData: function(){
		return this.dataString;
	}
});


//TODO
//Data-filters