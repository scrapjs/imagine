/*
* Special object to supply callable primitive. May consist of other data-sources.
* E.g. `.some['property']('to', ['call'], { with: 'params'})[1][2].[3]`
* It will make all necessary calls to obtain the most recent result
*/
function CallSequence(str){
	console.group("callsequence", str)

	this.chunkNames = [];
	this.chunkArguments = [];
	this.chunkTargets = [];

	//Parse chunks
	//.name(args)
	//['name'](args)
	//Every callchunk is:
	//{ name: '', arguments: [...]}

	str = escapeWithin(str, "()");
	str = escapeWithin(str, "''");
	str = escapeWithin(str, '""');

	str = this.matchChunk(str, this.plainChunkRE);

	if (!str) {
		console.log("callseq ok")
		console.groupEnd();
		return;
	}

	var c = 10; //liimiter of infinite cycling
	while (str && c){
		str = this.matchChunk(str, this.plainChunkRE) || this.matchChunk(str, this.keyChunkRE) //|| this.matchChunk(str, this.indexChunkRE);
		c--;
	}

	console.log("callseq ok");
	console.groupEnd();
}

CallSequence.prototype = {
	plainChunkRE: /^([a-z_$][a-z0-9_$]*)[ ]?(?:\(([^\)]*)\))?\.?/i,
	keyChunkRE: /^\[['"]((?:[^](?!['"]))+[^]|[^])['"]\][ ]?(?:\([^\)]*\))?\.?/i,
	//indexChunkRE: /^/i,
	
	/*
	* Finds chunk, parses it, fills inner lists of chunk params.
	* Returns string shortened or false.
	*/
	matchChunk: function(str, re){
		var match = str.match(re);
		console.log(match, str, re)

		if (match){
			console.group("chunk", str, match, re)
			str = str.replace(match[0], "");
			this.chunkNames.push(match[1]);
			this.chunkTargets.push(this.resolveName(unescape(match[1])));
			this.chunkArguments.push(this.parseArguments(match[2]));
			console.log("shortend string:", str)
			console.groupEnd()
			return str;
		}

		return false;
	},

	/*
	* Resolves data-source defined by name
	* May be fn or Object.prop
	*/
	resolveName: function(name){
		if (primitives[name]){
			return primitives[name]
		}

		//TODO lookup in data-dictionaries

		//throw new Error("CallSequence resolveName error: unknown datasource `" + name + "`")

		return console.error("Error happened");
	},

	/*
	* Arguments parser returns list of arguments for chunk
	*/
	parseArguments: function(str){
		console.log("args:", str)
	},

	/*
	* Invokes sequence
	*/
	makeCall: function(){
		var tmpValue = undefined;
		//Go by chunks
		/*for (var i = 0; i < this.chunkNames.length; i++){
			var arguments = this.getArgumentsData(this.chunkArguments[i]);

			tmpValue = this.chunkTargets[i].apply(this.expression.context, arguments);
			chu[i];
		}*/
	},

	/*
	* Obtains real data by calling arguments
	*/
	getArgumentsData: function(args){
		if (!args) return undefined;
		/*var argsData = [];
		for (var i = 0; i < args.length; i++){
			//supposed that each argument is a DataSource object
			argsData.push(args[i].getData());
		}*/

		return argsData;
	}
}