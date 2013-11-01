/*
	\1, \2 ... token
*/
function GroupRefToken(){
	this._constructor.apply(this, arguments)
}
extend(GroupRefToken.prototype, Token.prototype, {
	parse: function(str){
		//init vars
		this.groupId = str;
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
	}
});