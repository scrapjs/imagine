var primitives = {
	int: int,
	number: number,
	float: float,
	bool: bool,
	none: none,

	//JSON-generator ones
	//TODO: think up guid and index
	numeric: function(a, b, format){

	},

	firstName: function(gender){

	},
	surname: function(){

	},
	gender: function(){

	},
	company: function(){

	},
	phone: function(mask){

	},
	email: function(random){

	},
	countriesList: function(){

	},
	country: function(){

	},
	state: function(){

	},
	city: function(){

	},
	street: function(){

	},
	date: function(format){

	},
	lorem: function(count, units){
		switch (units){
			case "words":
				break;
			case "sentences":
				break;
			case "paragraphs":
				break;
			default: //chars
				break;
		}
	},
}