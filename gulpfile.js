"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var jsmin = require('gulp-jsmin');
var del = require("del");
var run = require("run-sequence");

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
          "fonts/**/*.{woff,woff2}",
          "img/**",
          "js/**",
          "*.html"
     ], {
       base: "."
     })
     .pipe(gulp.dest("build"));
});

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: false
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true})
      ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function() {
  return gulp.src("build/img/icons/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
     }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html:copy", function() {
   return gulp.src("*.html")
     .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
   server.reload();
   done();
});

gulp.task("js", function() {
  gulp.src("js/script.js")
    .pipe(gulp.dest("build/js"))
    .pipe(jsmin())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("js:copy", function() {
   return gulp.src("*js/script.js")
     .pipe(gulp.dest("build/js"))
     .pipe(jsmin())
     .pipe(rename("script.min.js"))
     .pipe(gulp.dest("build/js"));
});

gulp.task("js:update", ["js:copy"], function(done) {
   server.reload();
   done();
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html:update"]);
  gulp.watch("js/script.js", ["js:update"]);
});

gulp.task ("build", function(fn) {
  run(
    "clean",
    "copy",
    "style",
    "js",
    "images",
    "symbols",
    fn
  );
});
