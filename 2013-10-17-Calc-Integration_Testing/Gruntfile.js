module.exports = function(grunt) {

    //Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),

      qunit: {  //task
        // options: {} - if you put them here they'd apply to all of your targets. e.g. timeout: 5000, force: true - woul mean if that test fails I want you to keep going, cos by default in grunt if one fails the whole thing stops.
        master: { //target
          options: {
            urls: [ "http://localhost:3333/tests/master.html" ]//what url do you want to test
          }
        }
      },

      copy: {
        images: {
          expand: true,//I want you to expand the folders and keep going all the way down.
          source: [ "img/**/*.*"],//source is where we're grabbing them from
          cwd: "public/",//
          dest: "_build/"//this is where stuff will be copied to.
        },
        css: {
          expand: true,
          src: [ "css/**/*.*"],
          cwd: "public/",
          dest: "_build/"
        },
        js: {
          expand: true,
          src: [ "js/**/*.*"],
          cwd: "public/",
          dest: "_build/"
        },
      },

      watch: {
        js: {
          files: [ "public/js/app/**/*.js" ],
          tasks: [ "tests"],
          options: { nospawn: true }
        },
        tests: {
          files: [ "public/tests/**/*.html", "public/js/tests/**/*.js" ],
          taskes: [ "connect", "qunit" ],
          options: { nospawn: true}
        }
        html: {
          files: [ "public/**/*.haml" ],
          tasks: ["haml"],
          options: {nospawn: true}
        }
      }

      connect: {
        server: {
          options: {
            port: 3333,
            hostname: "localhost",
            base: "public"
          }
        }
      }


    });

    grunt.loadNpmTasks( "grunt-contrib-qunit" );
    grunt.loadNpmTasks( "grunt-contrib-connect" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-copy" );
    grunt.loadNpmTasks( "grunt-contrib-concat" );
    grunt.loadNpmTasks( "grunt-contrib-haml" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );

    grunt.registerTask( "tests", [ "connect", "qunit" ]);
    // grunt.registerTask( "tests", [ "connect", "qunit" ]);
    // grunt.registerTask( "tests", [ "connect", "qunit" ]);



    grunt.registerTask( "default", [ "tests"]);//this will get executed when you just type grunt, by default

};