/*
*	How's project called
*/
//#ifdef projectName
	//# put 'var projectName = "' + projectName + '";'
//#else
	var projectName = "imagine";
//#endif

/*
* Main function - handles any param passed
*/
var I = function(argument, ctx){
	if (typeof argument === "string" || argument instanceof RegExp){
		var exp = expression(argument);
		return exp.populate(ctx);
	} else if (argument instanceof Array){
		var repeatExp = new RepeatExpression(argument)
		return repeatExp.populate(ctx);
	} else {
		var dd = new DataDescriptor(argument);
		return dd.populate(ctx);
	}
}

//Make global
window[projectName] = I;