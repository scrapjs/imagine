/*
* Class responsible for getting data-source value.
* Primarily needed for DataTokens, to supply source value obtaining
*/
function DataSource(str){
	console.group("data source: ", str)

	//Source may be whether one of the primitives or CallSequence, like .some['property']('to', ['call'], { with: 'params'})[1][2].[3]
	this.source = this.recognizeParam(str);

	console.log("datasource ok")
	console.groupEnd();
}

DataSource.prototype = {
	/*
	* Determines what the param is: string, data object, sequence, json etc
	*/
	recognizeParam: function(str){
		console.log("recognizeParam", str)

		var result = undefined;
		//123.456
		if ((result = parseFloat(str))){
			return result;
		}

		//true/false
		else if (/^true$/i.test(str)){
			return true
		}
		else if (/^false$/i.test(str)){
			return false
		}

		//'string'
		else if (/^(?:"[^"]*"|'[^']*')$/.test(str)){
			return str.slice(1,-1);
		}

		//['list', 04, 'things']
		else if (str[0] === "[" && str[str.length - 1] === "]"){
			str = str.slice(1,-1).trim();

			if (!str) return [];

			str = escapeWithin("{}", str);
			str = escapeWithin("[]", str);
			var params = str.split(",");
			var result = [];
			for (var i = 0; i < params.length; i++){
				params[i] = unescape(params[i]).trim();
				result[i] = this.recognizeParam(params[i]);
			}

			return result;
		}

		//{a: 1, b: 2}
		else if (str[0] === "{" && str[str.length - 1] === "}"){
			str = str.slice(1,-1);
			str = str.trim();

			if (!str) return {};

			str = escapeWithin("{}", str);
			str = escapeWithin("[]", str);

			var props = str.split(",");

			result = {};
			for (var i = 0; i < props.length; i++){
				props[i] = props[i].trim()
				var propComps = props[i].split(":");
				var key = propComps[0].trim();
				var value = propComps[1].trim();
				if ((key[0] === "'" && key[key.length - 1] === "'") || (key[0] === '"' && key[key.length - 1] === '"')){
					key = key.slice(1, -1);
				}
				value = unescape(value);
				result[key] = this.recognizeParam(value);
			}

			return result;
		}

		//data.['type'](12, 13).maybe.['with_some']['property'].at.last(1, 'abc', [[1], 2])
		else if (/[a-z_$@]/i.test(str[0])){
			//Then define calling sequence
			return new CallSequence(str);
		}

		throw new Error("Can not recognize the param `" + str + "`")
		return null;
	},

	/*
	* Returns data specified by this source,
	* performs all necessary calls
	*/
	getData: function(){
		return null;
	}
}