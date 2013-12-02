module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files: ['src/**/*.js'],
			options: {
				globals: {
					module: true
				},
				strict: false
			}
		},

		homemade: {
			main:{
				src: "./build/build.js",
				dest: "<%= pkg.name %>.js",
				context: {
					projectName: "imagine",
					DEV: false
				}
			}
		},

		'closure-compiler': {
			frontend: {
				closurePath: '.',
				js: '<%= pkg.name %>.js',
				jsOutputFile: '<%= pkg.name %>.min.js',
				maxBuffer: 800,
				options: {
					//compilation_level: 'ADVANCED_OPTIMIZATIONS',
					compilation_level: 'SIMPLE_OPTIMIZATIONS',
					language_in: 'ECMASCRIPT5_STRICT',
					formatting: 'pretty_print'
				}
			}
		}
	});

	//load tasks
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-closure-compiler');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-homemade");

	//register tasks
	grunt.registerTask('test', ['jshint', 'qunit']);
	grunt.registerTask('default', ['homemade','closure-compiler']);

};