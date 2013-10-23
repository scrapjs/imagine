var delimiters = ["{{", "}}"], //template-defined variable delimiters
	name = "[a-z 0-9_-]+",
	variable = delimiters[0] + "\s*(" + name + ")\s*" + delimiters[1],
	variableRe = new RegExp( variable ), //used to detect variables needed
	tokenRe = new RegExp( "(\s*" + name + "\s*)" ) //TODO: detect target of variable

//returns object, representing data-values required for the template
function detectDataRequired(str){
	var matches = str.match(varRe);
	//TODO: form matched variables array

	//parse each match, forming object nesting
	for (var i = 0; i < matches.length; i++){
		var match = matches[i],
			parts = match.split(".");

		//each next part forms new level of nesting
		for (var level = 0; level < parts.length; level++){

		}

		while (match = re.exec(str)) {
			console.log(match)
		}

	}
}

//returns array of DOM-nodes to bind values to
function detectTargetsToBind(html){
	var bindings = [];
}


//updates targets passed with data passed
function targetsFromData(targets, data){
	for (var i = 0; i < targets.length; i++){
		var target = targets[i];

	}
}

//updates data object passed based on targets values
function dataFromTargets(targets, data){
	for (var i = 0; i < targets.length; i++){
		var target = targets[i];

	}
}