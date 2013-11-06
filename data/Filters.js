/*
*{{ a|slugify }}
*/
//Useful to transcribe foreign names like Дима → Dima
function slugify(input){
	var output = input.toLowerCase();
	output = output.replace(/ /g, "-");

	//TODO: i18d slugification hook
	//Or maybe just map transcriptions map?

	return output;
}

/*
*/
function slice(input, from, to){

}



//{{ a|where a.gender == plural and a.face == }}