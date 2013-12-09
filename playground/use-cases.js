//Kudago map items case
var items = imagine([/{{ repeat(30,50) }}/, {
	id: /{{ index }}/,
	coordinates: /{{ coordinates([30,50], [30,50]) }}/,
	title: imagine.title,
	url: /http:\/\/local.kudago.com\/(?:place|event)\/{{ index }}/
}])


//