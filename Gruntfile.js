var grunt = require('grunt');

grunt.initConfig({
   uglify: {
      my_target: {
         files: {
            'nautilus.min.js': ['nautilus.js']
         }
      }
   },

   watch: {
      dist: {
         files: ['src/**/*.js'],
         tasks: ['build']
      }
   },

   concat: {
      dist: {
         src: [
            'src/header.js',
            'src/vars.js',
            'src/utils.js',
            'src/queue.js', 
            'src/main.js',
            'src/export.js',
         ],
         dest: 'nautilus.js',
      },
   },

   run: {
      test: {
         cmd: 'npm',
         args: [
            'run',
            'test:only'
         ]
      }
   },
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-run');

grunt.registerTask('test', ['run:test']);
grunt.registerTask('default', ['concat', 'uglify', 'test']);
grunt.registerTask('build', ['concat', 'uglify']);
grunt.registerTask('dev', ['watch']);

module.exports = grunt;