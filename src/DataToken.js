/*
	{{ Data.Type }} token
*/
function DataToken(){
	this._constructor.apply(this, arguments)
}
extend(DataToken.prototype, Token.prototype, {
	maxRecursionDepth: 5,

	parse: function(str){
		this.dataType = str
		//TODO: recognize data type

		//TODO: save specificity of generated data type and get access to any property written
		//E.g. {{ noun }} → Noun.plural = true, then {{ verb|with(" noun: \d1.plural ") }}
	},

	toString: function(){
		return "{{ " + this.dataType + " }}" + this.renderMultiplier();
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
		for (var i = 0; i < times; i++){
			result += this.getData();
		}

		return result;
	},


	getData: function(){
		return this.dataType;
	}
});


//TODO
//Data-filters