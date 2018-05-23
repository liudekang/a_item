var gulp = require("gulp");
var url = require("url");
var server = require("gulp-webserver");
var clean = require("gulp-clean");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var sequence = require("gulp-sequence");
var cleancss = require("gulp-clean-css");
// var json = require("./src/data/data.json");
// var banner = require("./src/data/ban_list.json");

var mock = require("./mock");

gulp.task("css", function() {
    gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css"));
});

gulp.task("listen", function() {
    gulp.watch("./src/scss/*.scss", ["css"]);
});

gulp.task("server", function() {
    gulp.src("src")
        .pipe(server({
            port: 8080,
            // open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var obj = url.parse(req.url, true);
                var query_data = obj.query;
                if (obj.pathname.indexOf("/api") !== -1) {
                    // console.log(obj.pathname);
                    res.end(JSON.stringify(mock(obj.pathname)));
                }
                if (obj.pathname.indexOf("/random") !== -1) {
                    res.end(JSON.stringify(mock(obj.pathname)));

                }
                if (obj.pathname.indexOf("/search") !== -1) {
                    // res.end(JSON.stringify(mock(obj.pathname)));
                    res.end(JSON.stringify(mock(query_data.id)));
                }

                next()
            }
        }))
});
gulp.task("default", function(ck) {
    sequence("css", "listen", "server", ck)
});