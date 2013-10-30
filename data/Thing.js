/* General data object with description */
function Thing(){
	this.constructor();
}

Thing.prototype = {
	/*
		General class creating thing
	*/
	constructor: function() {
		//populate own (instance) properties based on the prototype methods
		for (var prop in this){
			if (this[prop][0] !== "_"){
				//recognize different types of value: lexnum pattern, array, function, ...
				if (typeof this[prop] === "function"){
					this[prop] = this.prop();
				} else if (this[prop] instanceof array){
					this[prop] = randFrom(this.prop)
				} else if (typeof this[prop] === "string" ){
					this[prop] = populate(this[prop]);
				} else {
					this[prop] = this.prop;
				}
			}
		}
	},

	create: function(){

	}
}

extend(Thing.prototype,
	{
		additionalType:"{{ url }}"
		description:"{{ lorem }}",
		image: "{{ url }}",
		name: "{{ title }}",
		sameAs: "{{ url }}",
		url: "{{ url }}"
	}
);