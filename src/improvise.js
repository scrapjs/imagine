/* Script just evaluates document html */

//NOTE: An alternate way is to go throught all document children except script, …

var defaults = {

}
var options = window.improvise || defaults;

var Improviser = new Improviser(options);

//console.log(Improviser)

var content = Improviser.evalDjango(document.body.innerHTML);
document.body.innerHTML = content;