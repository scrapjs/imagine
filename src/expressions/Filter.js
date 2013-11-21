/*
* Filter caller
*/
function Filter(str){

	console.log("New filter: ", str)
	// Target filter function to call, like `capitalize`
	this.fn = function(a){ return a};

	// Params to pass to filter function, like `slice(2,3)`
	// Every filter param is a data-source.
	this.params = [];
}

Filter.prototype = {
	/*
	* Main handler: applies filter to the src passed with filtering function fn
	*/
	process: function(src){
		return this.fn.apply(src, this.getParams());
	},

	/*
	* Obtains real parameters values
	* As far as params can include DataSources to call, it has to be called first in order to get real data
	*/
	getParams: function(){
		var result = [];
		for (var i in this.params){
			result.push(this.params[i].getData());
		}

		return result;
	}
}