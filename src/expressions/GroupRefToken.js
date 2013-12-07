/**
* \1, \2 ... token
* @constructor
* @extends Token
*/
function GroupRefToken(){
	this._constructor.apply(this, arguments)
}
extend(GroupRefToken.prototype, Token.prototype, {
	parse: function(str){
		//init vars
		this.groupId = ~~str;
	},

	toString: function(){
		return "\\" + this.groupId + this.renderMultiplier();
	},

	toJSON: function(){
		return {
			token: "GroupRefToken",
			groupId: this.groupId,
			multiplier: this.multiplier
		}
	},

	populate: function(ctx){
		var times = int(this.multiplier[0], this.multiplier[1], true);
		var result = "";
		for (var i = 0; i < times; i++){
			result += this.expression.groups[this.groupId].populate(ctx, [1,1]);
		}

		return result;
	}
});