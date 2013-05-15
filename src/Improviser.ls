class Improviser
	@dataSources = {

	}

	@defaults = {
		locale: 'en_US',
		live: false,		
		data: {

		}
	}

	@defaultDescriptor = 
		post:
			title: "Post title #",
			content: "{{ lorem p2 }}",
			author: "{{ name en }}",
			date: "{{ date }}"
		posts: ["{{ post }}", 10, 20]
	

	(options) ->
		@options = @@defaults with options

	# comprehensive eval: element, 
	# TODO
	eval: (arg) ->
		...
		@evalHTML arg

	# evaluates django template string
	evalDjango: (str, name = "index") ->
		str = @cleanHTML str

		tpl = swig.compile str, {filename: name}

		dataDescriptor = @detectDataRequired str
		dataDescriptor <<< @options.data if @options.data

		data = @generateDataByDescriptor dataDescriptor

		tpl data

	# removes script tags and other litter from html string
	cleanHTML: (htmlString) ->
		htmlString - /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi


	# Get data descriptor object with needed data from string
	detectDataRequired: (str) ->
		@@defaultDescriptor

	# Recognizes data needed from string passed
	generateDataByDescriptor: (descriptor) ->
		| str? =>
			...
		| otherwise =>

		data = {}

		# TODO: test descriptor strings by regex
		#for key, val of descriptor
		#	switch
		#	| val =>

		data = {
			"posts": [
			{
				"title": "post title 1",
				"content": "some post description 1",
				"author": "dmitry_f",
				"date": new Date()
			},
			{
				"title": "post title 2 ",
				"content": "some post description 2",
				"author": "dmitry_f",
				"date": new Date()
			},
			{
				"title": "post title 2 ",
				"content": "some post description 2",
				"author": "dmitry_f",
				"date": new Date()
			}
			],
			"name": "page name",
			"intro": "Some intro text"
		}
