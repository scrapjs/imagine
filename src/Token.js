/*
*	Token abstract class
*	Represents basic token behaviour:
*	- alternatives
*	- multiplier of token
*/
function Token(){
	this._constructor.apply(this, arguments)
}

extend(Token.prototype, {
	/*
		@str - string to parse
		@multiplier - how many times to repeat
		@tokens - array of tokens to store all tokens examples in.
	*/
	_constructor: function(str, multiplier, expression){
		this.expression = expression;

		//keep tokens list
		this.idx = this.expression.tokens.length;
		this.expression.tokens.push(this);

		//Multiplier is a basic thing
		this.multiplier = this.parseMultiplier(multiplier);

		//Init may vary
		this.parse(str);
	},

	//===================== Token interface (implementable)
	/*
		Main analyzer: creates own model of token
	*/
	parse: function(str){
	},

	/*
		Main renderer - tries to eval the structure. Returns random model
	*/
	populate: function(){

	},

	/*
		Simple JSON representer
	*/
	toJSON: function(){

	},

	/*
		Renders string, representing expression
	*/
	toString: function(){
	},



	//============================== Common token methods
	/*
		Returns parsed multiplier array from string
	*/
	singleMultiplierRe: /\{[ ]*([0-9])[ ]*\}/,
	diapMultiplierRe: /\{[ ]*([0-9]*)[ ]*,[ ]*([0-9]*)[ ]*\}/, 
	parseMultiplier: function(str){
		if (typeof str === "number"){
			return [str[0], str[0]]
		} else if (str instanceof Array){
			if (str.length === 2){
				return str;
			} else {
				return [str[0], str[0]]
			}
		} else {
			var match;
			if (!str){
				return [1,1]
			} else if (str === "?"){
				return [0,1]
			} else if (str === "*"){
				return [0, this.maxMultiplier]
			} else if (str === "+"){
				return [1, this.maxMultiplier]				
			} else if ((match = str.match(this.singleMultiplierRe))){
				return [~~match[1], ~~match[1]]
			} else if ((match = str.match(this.diapMultiplierRe))){
				return [match[1] ? ~~match[1] : 0, match[2] ? ~~match[2] : this.maxMultiplier]
			} else {
				return [1,1]
			}
		}
	},

	/*
		Convert multiplier to string
	*/
	renderMultiplier: function(){
		if (this.multiplier[0] === 1 && this.multiplier[1] === this.maxMultiplier){
			return "+"
		} else if (this.multiplier[0] === 0 && this.multiplier[1] === this.maxMultiplier){
			return "*"
		} else if (this.multiplier[0] === 0 && this.multiplier[1] === 1){
			return "?"
		} else if(this.multiplier[0] === this.multiplier[1]){
			return "{" + this.multiplier[0] + "}"
		} else {
			return "{" + this.multiplier[0] + ", " + this.multiplier[1] + "}"
		}
	},

})