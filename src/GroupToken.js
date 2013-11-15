/*
	([^]*) and (?:[^]*) and [^]* token
*/
function GroupToken(){
	this._constructor.apply(this, arguments)
}
extend(GroupToken.prototype, Token.prototype, {
	parse: function(str){
		//init vars
		this.alternatives = [];

		this.groupType = str.match(/(\(\?\:|\(|)/)[1];
		str = str.slice(this.groupType.length, this.groupType ? -1 : str.length);
		
		//split alternatives
		var alternatives = str.split("|");
		for (var i = 0; i < alternatives.length; i++){
			this.alternatives.push(this.parseSequence(alternatives[i]));
		}
	},

	/*
		Parses one of the options: returns sequence (array) of tokens.
		Supposed that sequence does not contain alternatives | or groups ().
	*/
	anyTokenRE: /^\[([^]*)\](\?|\*|\+|\{[0-9, ]*\}|)/,
	dataTokenRE: /^\{\{[ ]*([0-9.a-zA-Z$_,-\|\(\)]*)[ ]*\}\}(\?|\*|\+|\{[0-9, ]*\}|)/,
	specSymbolTokenRE: /^\\([^])(\?|\*|\+|\{[0-9, ]*\}|)/,
	groupStubTokenRE: new RegExp("^" + refBrackets[0] + "([0-9]+)" + refBrackets[1]),
	stringTokenRE: new RegExp("^((?:[^](?![\\*\\?\\+\\{\\[" + refBrackets[0] + "\\\\]|$))+[^]|[^](?=[\\*\\?\\+\\{\\[" + refBrackets[0] + "\\\\]|$))(\\?|\\*|\\+|\\{[0-9, ]*\\}|)"),
	parseSequence: function(str){
		//#ifdef DEV
		var debug = false;
		//#endif

		//#if DEV
		debug && console.group("alternative:", str)
		//#endif
		var sequence = [];

		//find first metasymbol
		var tokenMatch;
		var c = 0; //prevent infinite cycle
		while( str  && c < 9999){
			if (tokenMatch = str.match(this.anyTokenRE)){
				//#if DEV
				debug && console.log("anyToken:", tokenMatch);
				//#endif
				sequence.push(new AnyToken(tokenMatch[1], tokenMatch[2], this.expression));
			} else if (tokenMatch = str.match(this.dataTokenRE)){
				//#if DEV
				debug && console.log("dataToken:", tokenMatch)
				//#endif
				sequence.push(new DataToken(tokenMatch[1], tokenMatch[2], this.expression));				
			} else if (tokenMatch = str.match(this.specSymbolTokenRE)){
				//#if DEV
				debug && console.log("specSymbol:", tokenMatch)
				//#endif

				//TODO: test on real spec symbols

				if (/[1-9]/.test(tokenMatch[1])){
					//group reference like \1
					sequence.push(new GroupRefToken(~~tokenMatch[1], tokenMatch[2], this.expression));
				} else {
					sequence.push(new StringToken("\\" + tokenMatch[1], tokenMatch[2], this.expression));
				}
			} else if (tokenMatch = str.match(this.groupStubTokenRE)){
				//#if DEV
				debug && console.log("groupStub:", tokenMatch);
				//#endif
				sequence.push(this.expression.tokens[tokenMatch[1]]);
			} else if (tokenMatch = str.match(this.stringTokenRE)){
				//#if DEV
				debug && console.log("stringToken:", tokenMatch)
				//#endif
				if (tokenMatch[2]) {
					sequence.push(new StringToken(tokenMatch[1].slice(0,-1), 1, this.expression))
					sequence.push(new StringToken(tokenMatch[1].slice(-1), tokenMatch[2], this.expression))
				} else {
					sequence.push(new StringToken(tokenMatch[1], tokenMatch[2], this.expression))
				}
			} else {
				//if no any other token worked: cast to string token
				//#if DEV
				debug && console.log("remainderToken:", "\'" + str + "\'")
				//#endif
				sequence.push(str)
				str = ""
				break;
			}

			str = str.slice(tokenMatch[0].length);
			if (!str) break;
			c++;
		}
		
		//#if DEV
		debug && console.log(sequence)
		debug && console.groupEnd();
		//#endif
		return sequence;
	},

	toString: function(flatten){
		var result = this.groupType;
		for(var i = 0; i < this.alternatives.length; i++){
			var sequence = this.alternatives[i];
			//console.group(sequence)
			for (var j = 0; j < sequence.length; j++){
				//console.log(flatten, sequence[j])
				if (flatten && (sequence[j] instanceof GroupToken)){
					result += refBrackets[0] + sequence[j].idx + refBrackets[1];
				} else {
					result += sequence[j].toString();
				}
			}
			//console.groupEnd();
			if (i !== this.alternatives.length - 1) result += "|"
		}

		if (this.groupType) result += ")";
		result += this.renderMultiplier();

		return result;
	},

	toJSON: function(){
		result = {
			token: "GroupToken",
			alternatives: [],
			multiplier: this.multiplier
		}

		for (var i = 0; i < this.alternatives; i++){
			var seq = [];
			for (var j = 0; j < this.alternatives[i].length; j++){
				seq.push(this.alternatives[i][j].toJSON())
			}
			result.alternatives.push(seq)
		}

		return result
	},

	populate: function(multiplier){
		var result = "",
			m = multiplier || this.multiplier,
			times = int(m[0], m[1]);

		var seq = any(this.alternatives);
		for (var i = 0; i < times; i++){
			for (var j = 0; j < seq.length; j++){
				result += seq[j].populate();
			}
		}

		return result;
	}
});