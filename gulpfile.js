/* hepl-dw/vitfoud-client
 *
 * /gulpfile.js - Gulp tasks
 *
 * coded by leny@flatLand!
 * started at 22/04/2017
 */

var gulp = require( "gulp" ),
    gutil = require( "gulp-util" ),
    pug = require( "gulp-pug" ),
    sass = require( "gulp-sass" ),
    autoprefixer = require( "gulp-autoprefixer" ),
    csso = require( "gulp-csso" ),
    browserify = require( "browserify" ),
    source = require( "vinyl-source-stream" ),
    uglify = require( "gulp-uglify" ),
    buffer = require( "vinyl-buffer" ),
    babelify = require( "babelify" ),
    watchify = require( "watchify" );

var aLibs = Object.keys( require( "./package.json" ).dependencies );

// --- Task for pug

gulp.task( "html", function() {
    gulp.src( "src/pug/**/*.pug" )
        .pipe( pug( {} ) )
        .pipe( gulp.dest( "." ) );
} );

// --- Task for styles

gulp.task( "css", function() {
    gulp.src( "src/sass/**/*.scss" )
        .pipe( sass().on( "error", sass.logError ) )
        .pipe( autoprefixer() )
        .pipe( csso() )
        .pipe( gulp.dest( "assets/css" ) );
} );

// --- Tasks for js

gulp.task( "js-libs", function() {
    // process.env.NODE_ENV = "production";
    browserify()
        .require( aLibs )
        .bundle()
        .pipe( source( "libs.min.js" ) )
        .pipe( buffer() )
        .pipe( uglify() )
        .pipe( gulp.dest( "assets/js" ) );
} );

gulp.task( "js-app", function() {
    browserify( "src/js/main.js" )
        .transform( babelify )
        .external( aLibs )
        .bundle()
        .on( "error", gutil.log.bind( gutil, "Browserify Error" ) )
        .pipe( source( "app.min.js" ) )
        .pipe( buffer() )
        .pipe( uglify() )
        .pipe( gulp.dest( "assets/js" ) );
} );

gulp.task( "js-watch", function() {
    watchify.args.debug = true;
    var bundler = watchify( browserify( "src/js/main.js" ), watchify.args );

    bundler.transform( babelify );

    function rebundle() {
        return bundler
            .bundle()
            .on( "error", gutil.log.bind( gutil, "Browserify Error" ) )
            .pipe( source( "app.min.js" ) )
            .pipe( buffer() )
            .pipe( uglify() )
            .pipe( gulp.dest( "assets/js" ) );
    }

    bundler.on( "update", rebundle );
    bundler.on( "log", gutil.log.bind( gutil ) );

    return rebundle();
} );

gulp.task( "js", [ "js-libs", "js-app" ] );

// --- Watch tasks

gulp.task( "watch", [ "js-watch" ], function() {
    gulp.watch( "src/pug/**/*.pug", [ "html" ] );
    gulp.watch( "src/sass/**/*.scss", [ "css" ] );
} );

// --- Aliases

gulp.task( "default", [ "html", "css", "js" ] );
gulp.task( "work", [ "default", "watch" ] );
