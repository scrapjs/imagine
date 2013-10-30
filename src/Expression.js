/*
*	Expression represents specific structure to generate.
*	Provides context for tokens.
*/
function Expression(){
	this._constructor.apply(this, arguments)
}

extend(Expression.prototype, {
	defaults: {
		maxMultiplier: 99, //max possible multiplier generated by * and +
	},

	_constructor: function(str, options){
		this.tokens = [];//dict of tokens
		this.groups = [];//ordered groups to get access
		this.options = extend({}, this.defaults, options);

		//Escape all nested tokens pointers
		var str = this.escape(str);

		//Analyze branches
		this.tokens.length = 1; //reserve place for root
		str = this.flatten(str);

		this.tokens[0] = new GroupToken(str, 1, this);
	},

	/*
		Return string with nested groups removed, replaced with group references.
	*/
	groupRE:  /(\((?:\?\:)?[^\(\)]*\))(\?|\*|\+|\{[0-9, ]*\}|)/,
	flatten: function(str){		
		//#ifdef DEV
		var debug = false
		//#endif

		//build tree from innermost branches
		var groupMatch;
		var c = 0; //prevent infinite cycle

		//build innermost branches
		while((group = str.match(this.groupRE)) !== null  && c < 9){
			//#if DEV
			debug && console.group("group:", "'" + group[1] + "'", "'" + group[2] + "'")
			//#endif

			var token = new GroupToken(group[1], group[2], this);
			str = str.replace(group[0], "%" + token.idx);
			console.log(token.multiplier)
			//#if DEV
			debug && console.groupEnd();
			//#endif
			c++
		}

		return str;
	},


	/*
		Cleans string from occasinal token pointers
	*/
	escape: function(str){
		str = str.replace("%", "\\%");
		return str
	},


	/*
		Gets generated instance based on this expression
	*/
	populate: function(){

	},

	/*
	*/
	toString: function(){
		return this.tokens[0].toString()
	}

})