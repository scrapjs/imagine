/**
* {% command %} token
* @constructor
* @extends Token
*/
function TagToken(){
	this._constructor.apply(this, arguments)
}
//TODO: optimize sequences. Now you can write something like a-я (a is english), and it will raise huge list
//TODO: make reserved things like alnum
extend(TagToken.prototype, Token.prototype, {
	parse: function(str){
		console.group("TagToken: ", str)

		//Get rid of brackets
		str = str.slice(2, -2).trim();

		this.tagExpression = str;

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

		console.groupEnd();
	},

	populate: function(ctx, multiplier){
		var m = multiplier || this.multiplier,
			result = "",
			times = int(m[0], m[1], true);

		for (var i = 0; i < times; i++){
			result += any(this.alternatives)
		}

		return result;
	},

	toString: function(){
		return "[" + this.alternatives + "]" + this.renderMultiplier();
	},

	toJSON: function(){
		return {
			token: "TagToken",
			alternatives: this.alternatives.split(""),
			multiplier: this.multiplier
		}
	}
})