/**
* Wrapper over expression no comprehend things like ["{{ repeat }}", ...things]
* @constructor
*/
function RepeatExpression(arr){

	this.repeatContext = {
		repeat: this.repeat
	};
	//context for every subject called
	this.subjectContext = extend({}, I, {
		lastIndex: undefined,
		index: this.index
	});

	//match if first item is `{{ repeat }}` statement
	var repeatMatch, restArgs, repeatStr;
	if (typeof arr[0] === 'string' && (/\{\{[ ]*repeat[ \(\),0-9]*\}\}/.test(arr[0]))){
		repeatStr = arr[0];
		restArgs = arr.slice(1);
	} else {
		restArgs = arr;
	}

	//eval subjects
	this.subjects = []
	for (var i = 0; i < restArgs.length; i++){
		this.subjects.push(new DataDescriptor(restArgs[i]))
	}

	//if it was a plain array, repeat as many times as subjects is there
	if (!repeatStr) repeatStr = '{{ repeat(' + this.subjects.length + ') }}';

	this.repeatContext.subjects = this.subjects;
	this.repeatContext.subjectContext = this.subjectContext;

	//own repeat expression
	this.repeatEx = expression(repeatStr)

	console.log("repeatex", this.subjects)
	//NOTE: there everything is ok, shit happens on call
}

RepeatExpression.prototype = {

	/*
	* To use from within RepeatExpression lists comprehensions
	* Requires context of call
	*
	* Example call:
	* repeat(from, to, randomly) or repeat(times, randomly)
	*/
	//TODO: repeat with no context returns undefined. Always
	repeat: function(a, b, c){
		console.group("repeatcall with ctx", this)

		if (!this.subjects || this.subjects.length === undefined) return undefined

		//define how many times to repeat
		var min = 1, max = 1, randomly = false;
		if ((b === undefined || b === true || b === false) && a !== undefined){
			max = a;
			min = a;
			randomly = !!b;
		} else if (b !== undefined && a !== undefined) {
			max = b;
			min = a;
			randomly = !!c;
		}


		//define subjects context
		var times = int(min, max);

		this.subjectContext.lastIndex = undefined;

		//Fill results list
		var resultList = [], length = this.subjects.length || 1;
		
		for (var i = 0; i < times; i++){

			var subject = randomly ? any(this.subjects) : this.subjects[i % length];
			console.group("repeat iteration", this.subjectContext.lastIndex, subject)

			if (subject){
				resultList.push(subject.populate(this.subjectContext));

				//if index function has changed last index, increment from the new value
				if (this.subjectContext.lastIndex !== undefined) {
					this.subjectContext.lastIndex++;
				}
				console.log("idx after populate", this.subjectContext.lastIndex)
			} else {
				//weird case when non-data-descriptor
				resultList.push(subject);
				console.log("wrong num")
			}
			console.groupEnd();
		}
		console.groupEnd();

		return resultList
	},

	/*
	* To use fromwithin data descriptors. Inserts index of item.
	*/
	//TODO: index with no context always returns 1
	index: function(from){
		if (this.lastIndex === undefined) {
			this.lastIndex = from || 0;
		}
		console.log("index fn", this.lastIndex)
		return this.lastIndex;
	},

	populate: function(ctx){
		console.group("populate repeatex", this.subjects)
		var result = this.repeatEx.populate(this.repeatContext);
		console.groupEnd();
		return result;
	}	
}