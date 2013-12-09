/**
* Special object to supply callable primitive. May consist of other call sequences.
* E.g. `.some['property']('to', ['call'], { with: 'params'})[1][2].[3]`
* It will make all necessary calls to obtain the most recent result
*
* Called within expressions only
* @constructor
*/
function CallSequence(str){
	if (!str) return undefined;

	//console.group("callsequence", str, expression)

	this.chunkNames = [];
	this.chunkArguments = [];

	//Parse chunks
	//.name(args)
	//['name'](args)
	//Every callchunk is:
	//{ name: '', arguments: [...]}

	str = escapeWithin(str, "()", "''", '""');

	//Make initial chunk matching
	var match;
	match = str.match(this.plainChunkRE);

	if (!match) {
		throw new Error("Cannot match initial call sequence chunk `" + str + "`")
		//return null;
	}

	this.chunkNames.push(unescape(match[1]));
	this.chunkArguments.push(parseArguments(unescape(match[2])));

	str = str.replace(match[0], "");

	if (!str) {
		//console.log("callseq ok")
		//console.groupEnd();
		return;
	}

	//Match rest chunks
	var c = 10; //limiter of infinite cycling
	while ((match = str.match(this.plainChunkRE) || str.match(this.keyChunkRE)) && c){
		//console.log("chunk", match)
		this.chunkNames.push(unescape(match[1]));
		this.chunkArguments.push(parseArguments(unescape(match[2])));
		str = str.replace(match[0], "");
		c--;
	}

	//console.log("callseq ok", this.chunkNames);
	//console.groupEnd();
}

CallSequence.prototype = {
	plainChunkRE: /^([a-z_$][a-z0-9_$]*)[ ]?(?:\(([^\)]*)\))?\.?/i,
	keyChunkRE: /^\[['"]((?:[^](?!['"]))+[^]|[^])['"]\][ ]?(?:\([^\)]*\))?\.?/i,
	//indexChunkRE: /^/i,

	/*
	* Invokes sequence
	*/
	makeCall: function(ctx){
		var context = ctx || I;
		console.group("callseq makeCall `" + this.chunkNames[0] + "` within ctx:", ctx)

		var chunkTarget = context[this.chunkNames[0]];
		if (chunkTarget === undefined) chunkTarget = I[this.chunkNames[0]];
		if (chunkTarget === undefined) {
			console.error("warning: no target found for chunk `" + this.chunkNames[0] + "` within context ", context)
			console.groupEnd();
			return undefined;
		}

		if (typeof chunkTarget === "function"){
			var tmpValue = chunkTarget.apply(context, this.getArgumentsData(this.chunkArguments[0], context));
			//console.log("callseq result", tmpValue)
		} else {
			//TODO: what else value callsequence may possess? If it is object - probably I should eval it with data? No?
			console.groupEnd();
			var tmpValue = chunkTarget;
		}

		//Go by chunks
		for (var i = 1; i < this.chunkNames.length; i++){
			if (typeof tmpValue[this.chunkNames[i]] === "function"){
				var args = this.getArgumentsData(this.chunkArguments[i], context);
				tmpValue = tmpValue[this.chunkNames[i]].apply(context, args);
			} else {
				tmpValue = tmpValue[this.chunkNames[i]]
			}
		}
		console.groupEnd();

		return tmpValue;
	},

	/*
	* Obtains real data by calling arguments
	*/
	getArgumentsData: function(args, ctx){
		if (!args) return undefined;

		var argsData = [];
		for (var i = 0; i < args.length; i++){
			console.log("arg", args[i])
			//supposed that each argument is whether plain type or callsequence
			if (args[i] instanceof CallSequence) {
				argsData.push(args[i].makeCall(ctx));
			} else {
				argsData.push(args[i]);
			}			
		}

		return argsData;
	}
}