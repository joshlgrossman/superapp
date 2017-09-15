const debug = true;

module.exports = grunt => {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['**/*.spec.js']
      }
    },

    eslint: {
      options: {
        configFile: 'eslint.json',
        reset: true
      },
      build: ['src/**/*.js']
    },

    browserify: {
      build: {
        files: {
          'dist/app.js': 'src/app.js',
          'test/test.min.js': 'test/test.js'
        },
        options: {
          transform: [[
            'babelify', {
              presets: ['es2015', 'es2016', 'es2017'],
              plugins: ["transform-object-rest-spread"]
            }
          ]]
        }
      },
      options: {
        browserifyOptions: { debug }
      }
    },

    uglify: {
      build: {
        files: {
          'dist/app.js': 'dist/app.js'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', [
    'eslint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'browserify',
    'uglify'
  ]);

  grunt.registerTask('default', ['test', 'build']);

};