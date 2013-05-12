/* Script just evaluates document html */

//NOTE: An alternate way is to go throught all document children except script, …

var defaults = {

}
var options = window.improvise || defaults;

var content = Improviser.eval(document.body.innerHTML);
document.body.innerHTML = content;