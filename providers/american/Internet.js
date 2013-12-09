extend( Internet, {
	tld: ['com', 'biz', 'info', 'net', 'org'],
	userName: [
		'{{lastName}}.{{firstName}}',
		'{{firstName}}.{{lastName}}',
		'{{firstName}}[0-9]{2}',
		'[a-zA-Z]{{lastName}}'
	],
	email: '{{ userName }}@(?: {{ domainName }} | {{ freeEmailDomain }} )',
	url: "{{ protocol }}://(?:www.)?{{ siteName }}.{{ domain }}",
	protocol: ["http", "https", "ftp"].join("|"),

	siteName: "{{ word|slugify }}",

	userName: [
		'({{ lastName|slugify }}).({{ firstName|slugify }})',
		'\\2.\\1',
		'\\2[0-9]{2}',
		'[a-z]\\1'
	].join("|"),

	freeEmailDomain: ['gmail.com', 'yahoo.com', 'hotmail.com'].join("|")
	
})