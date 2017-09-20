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

    babel: {
      options: {
        presets: ['es2015', 'es2016', 'es2017']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'dist',
          ext: '.js'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', [
    'eslint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'babel'
  ]);

  grunt.registerTask('default', ['test', 'build']);

};