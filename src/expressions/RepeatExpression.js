//Wrapper over expression no comprehend things like ["{{ repeat }}", ...things]
function RepeatExpression(arr, context){

	this.context = {
		repeat: this.repeat,
		index: this.index
	};

	//context for subjects
	this.nestedContext = context || extend({}, I);
	this.nestedContext.index = this.index;
	this.nestedContext.context = this.context;
	this.context.nestedContext = this.nestedContext;

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
		this.subjects.push(new DataDescriptor(restArgs[i], this.nestedContext))
	}

	//if it was a plain array, repeat as many times as subjects is there
	if (!repeatStr) repeatStr = '{{ repeat(' + this.subjects.length + ') }}';

	this.context.subjects = this.subjects;

	//own repeat expression
	this.repeatEx = new Expression(repeatStr, this.context)

	//console.log("repeatex", this.context)
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

		if (!this.subjects || this.subjects.length === undefined) return undefined

		//console.group("repeatcall", this)

		var min = 1, max = 1, randomly = false;
		//repeat()
		if ((b === undefined || b === true || b === false) && a !== undefined){
			max = a;
			min = a;
			randomly = !!b;
		} else if (b !== undefined && a !== undefined) {
			max = b;
			min = a;
			randomly = !!c;
		}


		//define repeat context
		var lastIndex= undefined,
			times = int(min, max)

		//Make repeat sequence (resulting populated list)
		var resultList = [], length = this.subjects.length || 1;
		
		for (var i = 0; i < times; i++){

			var subject = randomly ? any(this.subjects) : this.subjects[i % length];
			//console.group("repeat iteration", lastIndex, subject)

			if (subject && subject.context){
					subject.context.lastIndex = lastIndex;
					
					resultList.push(subject.populate());

				//if index function has changed last index, increment from the new value
				if (subject.context.lastIndex !== undefined) {
					if (lastIndex === undefined) lastIndex = subject.context.lastIndex 
					lastIndex++;
				}
				//console.log("idx after populate", subject.context.lastIndex)
			} else {
				//weird case when non-data-descriptor
				resultList.push(subject);
				console.log("wrong num")
			}
			//console.groupEnd();
		}
		//console.groupEnd();

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
		//console.log("index fn", this.lastIndex)
		return this.lastIndex;
	},

	populate: function(){
		return this.repeatEx.populate();
	}	
}