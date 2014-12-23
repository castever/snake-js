'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;


// Watch Files For Changes & Reload
gulp.task('serve', function() {
    browserSync({
        notify: false,
        // Customize the BrowserSync console logging prefix
        logPrefix: 'SNAKE',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: ['app']
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
    gulp.watch(['app/**/*.js'], reload);
    // gulp.watch(['app/app/**/*.js'], [reload]);
    // gulp.watch(['app/lib/**/*.js'], [reload]);
    gulp.watch(['app/images/**/*'], reload);
});