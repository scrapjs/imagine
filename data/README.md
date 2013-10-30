# Data type

Default data structure is borrowed from [shema.org](shema.org).
Classes in main directory represents locale independent srtucture of data. These are such things as protocols, things, math etc.
Classes in locale-named directories redefines basic classes and may override methods or properties.

Data-type has interface as native js Object:

```js
	var thing1 = new Thing();
	var thing2 = Thing.create();
```


## Data provider

It is singleton object providing generation of some data.

```js
var randomUrl = Internet.url();
var randomEmail = Internet.email();
```

## How to create data type

```js
function SomeNewData(){
	this._create();
}

extend(
	//needed to implement basic methods, like _create etc.
	Thing.prototype,

	//some extra-class to extend own item from
	ExtraType.prototype, 

	//extra-object
	{
		//Set of custom replacements to use within this class
		_replacements: {

		},

		//redefine property
		description: "Special description",

		//remove property
		image: null,

		//function property: function, array, string or value
		someProperty: function(){
			return Math.random();
		},

		//array property: returns one from multitude
		otherProperty: [],

		objectProperty: {
			number: 
			get: []
		}

	}
)
```

## How to redefine locale data-type

```js
extend( Thing.prototype, {
	//object with fields to redefine
})
```

##  How to redefine local data-provider
extend( Internet, {
	//own methods
})