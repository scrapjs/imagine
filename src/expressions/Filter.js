/**
* Filter caller
* Used to call filter with special params in runtime
* @constructor
*/
function Filter(str, context){
	//console.group("filter", str)
	this.context = extend({}, I, context);

	var firstBrace = str.indexOf("(");

	if (firstBrace > 0){
		this.name = str.slice(0, firstBrace).trim();
		//console.log(str)
		this.params = parseArguments(str.slice(firstBrace).slice(1,-1), this.context);
	} else{
		this.name = str.trim();
	}

	// Target filter function to call, like `capitalize`
	this.fn = I.filters[this.name];

	if (!this.fn){
		console.error("no filter `" + this.name + "` found. `none` is used instead.")
		this.fn = none;
	}
	//console.groupEnd();
}

Filter.prototype = {
	/*
	* Main handler: applies filter to the src passed with filtering function fn
	*/
	process: function(src){
		//console.log("filter process:", src)
		return this.fn.apply(this, [src].concat(this.getParams()));
	},

	/*
	* Obtains real parameters values
	* As far as params can include DataSources to call, it has to be called first in order to get real data
	*/
	getParams: function(){
		if (!this.params) return undefined;

		var result = [];
		for (var i = 0; i < this.params.length; i++){
			if (this.params[i] instanceof CallSequence) {
				result.push(this.params[i].makeCall());
			} else {
				result.push(this.params[i]);
			}
		}

		return result;
	}
}