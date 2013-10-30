extend( Internet, {
	tld: ['com', 'biz', 'info', 'net', 'org'],
	freeEmailDomain: ['gmail.com', 'yahoo.com', 'hotmail.com'],
	userName: [
		'{{lastName}}.{{firstName}}',
		'{{firstName}}.{{lastName}}',
		'{{firstName}}[0-9]{2}',
		'[a-zA-Z]{{lastName}}'
	],
	email: '{{ userName }}@(?: {{ domainName }} | {{ freeEmailDomain }} )',
	url: '(?:http|http|http|https)://(?:www.)?{{ domainName }}/'
	
})