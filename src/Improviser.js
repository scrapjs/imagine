var Improviser, replace$ = ''.replace;
Improviser = (function(){
	Improviser.displayName = 'Improviser';
	var prototype = Improviser.prototype, constructor = Improviser;
	Improviser.dataSources = {};
	Improviser.defaults = {
		locale: 'en_US',
		live: false,
		data: {}
	};
	Improviser.defaultDescriptor = {
		post: {
			title: "Post title #",
			content: "{{ lorem p2 }}",
			author: "{{ name en }}",
			date: "{{ date }}"
		},
		posts: ["{{ post }}", 10, 20]
	};
	function Improviser(options){
		this.options = import$(clone$(constructor.defaults), options);
	}
	prototype.eval = function(arg){
		throw Error('unimplemented');
		return this.evalHTML(arg);
	};
	prototype.evalDjango = function(str, name){
		var tpl, dataDescriptor, data;
		name == null && (name = "index");
		str = this.cleanHTML(str);
		tpl = swig.compile(str, {
			filename: name
		});
		dataDescriptor = this.detectDataRequired(str);
		if (this.options.data) {
			import$(dataDescriptor, this.options.data);
		}
		data = this.generateDataByDescriptor(dataDescriptor);
		return tpl(data);
	};
	prototype.cleanHTML = function(htmlString){
		return replace$.call(htmlString, /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
	};
	prototype.detectDataRequired = function(str){
		return constructor.defaultDescriptor;
	};
	prototype.generateDataByDescriptor = function(descriptor){
		var data;
		switch (false) {
		case typeof str == 'undefined' || str === null:
			throw Error('unimplemented');
		}
		data = {};
		return data = {
			"posts": [
				{
					"title": "post title 1",
					"content": "some post description 1",
					"author": "dmitry_f",
					"date": new Date()
				}, {
					"title": "post title 2 ",
					"content": "some post description 2",
					"author": "dmitry_f",
					"date": new Date()
				}, {
					"title": "post title 2 ",
					"content": "some post description 2",
					"author": "dmitry_f",
					"date": new Date()
				}
			],
			"name": "page name",
			"intro": "Some intro text"
		};
	};
	return Improviser;
}());
function import$(obj, src){
	var own = {}.hasOwnProperty;
	for (var key in src) if (own.call(src, key)) obj[key] = src[key];
	return obj;
}
function clone$(it){
	function fun(){} fun.prototype = it;
	return new fun;
}