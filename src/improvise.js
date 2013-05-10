/* Script just evaluates document html */

//NOTE: An alternate way is to go throught all document children except script, …

var content = Improviser.evalHTML(document.body.innerHTML);
document.body.innerHTML = content;