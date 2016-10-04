var gulp = require("gulp");
var browserSync = require("browser-sync").create();


gulp.task("browserSync", function () {
    browserSync.init({
        server: {
            baseDur: "./"
        }
    });
});

gulp.task("start", ["browserSync"], function () {
    gulp.watch("./*.html", browserSync.reload);
    gulp.watch("assets/**/*.js", browserSync.reload);
    gulp.watch("assets/**/*.css", browserSync.reload);
});

//@TODO linting. 
//@TODO html, js && CSS minifier - update paths in index.html to refere min folders.
//@TODO create server to serve test && non-minified files only
