const debug = true;

module.exports = grunt => {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'babel-register'
        },
        src: ['test/**/*.spec.js']
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
      build: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'dist',
          ext: '.js'
        }]
      }
    },

    copy: {
      build: {
        files: [
          { expand: true, cwd: 'src/', src: ['index.d.ts'], dest: 'dist/' }
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', [
    'eslint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'babel',
    'copy'
  ]);

  grunt.registerTask('default', ['test', 'build']);

};