/*
* Filter caller, whics saves the params which are pa
*/
function Filter(str){

	console.log("New filter: ", str)
	// Target filter function to call, like `capitalize`
	this.fn = null;

	// Params to pass to filter function, like `slice(2,3)`
	this.params = [];
}

Filter.prototype = {

}