module.exports = function(grunt){
	grunt.initConfig({
		copy: {
			public: {
				cwd: 'public',
				src: '**',
				dest: 'dist',
				expand: true
			}
		},
		clean: {
			dist: {
				src: 'dist'
			}
		},
		useminPrepare: {
			html: 'dist/**/*.html'
		},
		usemin: {
			html: 'dist/**/*.html'
		},
		imagemin: {
			public: {
				expand: true,
				cwd: 'public/img',
				dest: 'dist/img',
				src: '**/*.{png,jpg,gif}'
			}
		},
		rev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			},

			imagens: {
				src: ['dist/img/**/*.{png,jpg,gif}']
			},
			minificados: {
				src: ['dist/js/**/*.min.js', 'dist/css/**/*.min.css']
			}
		},
		coffee: {
			compilar: {
				expand: true,
				cwd: 'public/coffee',
				src: ['**/*.coffee'],
				dest: 'public/js',
				ext: '.js'
			}
		},
		less: {
			compilar: {
				expand: true,
				cwd: 'public/less',
				src: ['**/*.less'],
				dest: 'public/css',
				ext: '.less'
			}
		},
		watch: {
			coffee: {
				options: {
					event: ['added', 'changed']
				},
				files: 'public/coffee/**/*.coffee',
				tasks: 'coffee/compilar'
			},
			less: {
				options: {
					event: ['added', 'changed']
				},
				files: 'public/less/**/*.less',
				tasks: 'less/compilar'
			},
			js: {
				options: {
					event: ['changed']
				},
				files: 'public/js/**/*.js',
				tasks: 'jshint:js'
			}
		},

		jshint: {
			js: {
				src: 'public/js/**/*.js'	
			}
		},

		browserSync: {
			public: {
				bsFiles: {
					src: ['public/**/*']
				},
				options: {
					watchTask: true,
					server: {
						baseDir: 'public'
					}
				}
			}
		}
	});


	grunt.registerTask('dist', ['clean','copy']);

	grunt.registerTask('server', ['browserSync', 'watch']);
	
	grunt.registerTask('minifica', ['useminPrepare',
		'concat','uglify', 'cssmin', 'rev:imagens', 'rev:minificados', 'usemin', 'imagemin']);

	grunt.registerTask('default', ['dist','minifica']);

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-rev');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-browser-sync');
}