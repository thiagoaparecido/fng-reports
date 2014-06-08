'use strict';// # Globbing// for performance reasons we're only matching one level down:// 'test/spec/{,*/}*.js'// use this if you want to match all subfolders:// 'test/spec/**/*.js'module.exports = function (grunt) {  // load all grunt tasks  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);  // Project configuration.  grunt.initConfig({    // Project settings    builddir: 'dist',    pkg: grunt.file.readJSON('package.json'),    meta: {      banner: '/**\n' + ' * <%= pkg.description %>\n' +        ' * @version v<%= pkg.version %> - ' +        '<%= grunt.template.today("yyyy-mm-dd hh:nn") %>\n' +        ' * @link <%= pkg.homepage %>\n' +        ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' + ' */'    },    watch: {      less: {        files: ['app/css/{,*/}*.less'],        tasks: ['less']      }    },    'expand-include': {      'get-started': {        src: [ 'app/partials/get-started/get-started-template.html' ],        dest: 'app/partials/get-started.html',        options: {          directiveSyntax: 'xml',          substituteEntities: true,          stripSelectedComments: true,          adjustReferences: false        }      }    },    concat: {      options: {        banner: '/*! forms-angular <%= grunt.template.today("yyyy-mm-dd") %> */\n'      },      build: {        src: [          'src/*.js',          'src/plugins/ng-grid/*.js',          'app/js/plugins/jsPDF/*.js'        ],        dest: '<%= builddir %>/fng-reports.js'      }    },//      If you are here because you just came across "Warning: Running "recess:dist" (recess) task Fatal error: variable @input-border is undefined Use --force to continue.//      Then make sure your bower.json specifies ~1.2 of git://github.com/t0m/select2-bootstrap-css.git#~1.2    clean: {      dist: {        files: [          {            dot: true,            src: [              '.tmp',              'dist/*',              'dist/.git*'            ]          }        ]      },      server: '.tmp'    },    // Add vendor prefixed styles    autoprefixer: {      options: {        browsers: ['last 1 version']      },      dist: {        files: [          {            expand: true,            cwd: '.tmp/styles/',            src: '{,*/}*.css',            dest: '.tmp/styles/'          }        ]      }    },    uglify: {      options: {        banner: '/*! forms-angular <%= grunt.template.today("yyyy-mm-dd") %> */\n'      },      build: {        src: '<%= builddir %>/fng-reports.js',        dest: '<%= builddir %>/fng-reports.min.js'      }    },    jshint: {      options: {        jshintrc: '.jshintrc',        ignores: ['app/js/services/utils.js']      },      all: [        'Gruntfile.js',        'server/{,*/}*.js',        'app/js/{,*/}*.js',        'app/demo/{,*/}*.js',        'test/api/{,*/}*.js',        'test/unit/{,*/}*.js',        'test/midway/{,*/}*.js',        'test/e2e/{,*/}*.js'      ]    },    karma: {      options: {        singleRun: true      },      unit: {        configFile: 'config/karma.conf.js'      },      midway: {        configFile: 'config/karma.midway.conf.js'      }    },    // Allow the use of non-minsafe AngularJS files. Automatically makes it    // minsafe compatible so Uglify does not destroy the ng references    ngmin: {      dist: {        files: [          {            expand: true,            cwd: '.tmp/concat/scripts',            src: ['app.js', 'lib.js'],            dest: '.tmp/concat/scripts'          }        ]      }    }  });  grunt.registerTask('build', [    'check',    'really-build'  ]);  grunt.registerTask('really-build', [    'clean:dist',    'autoprefixer',    'concat',    'ngmin',    'uglify'  ]);  grunt.registerTask('check', [//    'karma',     // need to port relevant tests from forms-angular    'jshint'  ]);  grunt.registerTask('default', [    'check'  ]);};