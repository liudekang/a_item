var gulp = require("gulp");
var url = require("url");
var server = require("gulp-webserver");
var clean = require("gulp-clean");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var rev = require("gulp-rev");
var revcollector = require("gulp-rev-collector");
var sequence = require("gulp-sequence");
var cleancss = require("gulp-clean-css");

var mock = require("./mock");

gulp.task("minCss", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(cleancss())
        .pipe(rev())
        .pipe(gulp.dest("./build/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("rev/css"))
});

gulp.task("copyHtml", function() {
    return gulp.src(["./rev/**/*.json", "./src/**/*.html"])
        .pipe(revcollector({
            replaceReved: true
        }))
        .pipe(gulp.dest("./build"))
})
gulp.task("copyIco", function() {
    return gulp.src(["./src/*.ico"])
        .pipe(gulp.dest("./build"))
})
gulp.task("copyOwnJs", function() {
    return gulp.src(["./src/js/{app,common,lib}/*.js", "./src/js/*.js"])
        .pipe(gulp.dest("./build/js"))
})
gulp.task("copyImg", function() {
    return gulp.src(["./src/image/*"])
        .pipe(gulp.dest("./build/image"))
})

gulp.task("listen", function() {
    return gulp.watch(["./src/scss/*.scss", "./src/js/app/*.js", "./src/*.html"], ["minCss", "copyHtml", "copyOwnJs"]);
});

gulp.task("server", function() {
    return gulp.src("build")
        .pipe(server({
            port: 8080,
            host: "169.254.19.2",
            // open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var obj = url.parse(req.url, true);
                var query_data = obj.query;
                //判断ajax请求
                if (obj.pathname.indexOf("/api") !== -1) {
                    // jsonp请求后台数据
                    if (query_data.format == "jsonp") {
                        var list_obj = mock(obj.pathname).items;
                        res.end(JSON.stringify(list_obj[query_data.chapter_id - 1]));
                    } else {
                        res.end(JSON.stringify(mock(obj.pathname)));
                    }
                }
                if (obj.pathname.indexOf("/random") !== -1) {
                    res.end(JSON.stringify(mock(obj.pathname)));
                }
                if (obj.pathname.indexOf("/search") !== -1) {
                    res.end(JSON.stringify(mock(query_data.id)));
                }
                next()
            }
        }))
});
gulp.task("default", function(ck) {
    sequence(["minCss", "copyIco", "copyOwnJs", "copyImg"], "copyHtml", "listen", "server", ck)
});