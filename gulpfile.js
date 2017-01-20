"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp = require("gulp"),
  browserify = require("browserify"),
  source = require("vinyl-source-stream"),
  buffer = require("vinyl-buffer"),
  tslint = require("gulp-tslint"),
  tsc = require("gulp-typescript"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  runSequence = require("run-sequence"),
  mocha = require("gulp-mocha"),
  istanbul = require("gulp-istanbul"),
  cucumber = require("gulp-cucumber"),
  browserSync = require('browser-sync').create();

var min_coverage = 70;
//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function () {

  var config = { formatter: "verbose", emitError: (process.env.CI) ? true : false };

  return gulp.src([
    "app/**/**.ts",
    "test/**/**/**.step.ts"
  ])
    .pipe(tslint(config))
    .pipe(tslint.report());

});

//******************************************************************************
//* BUILD
//******************************************************************************
var tsProject = tsc.createProject("tsconfig.json");

gulp.task("build-app", function () {
  return gulp.src([
    "app/**/**.ts",
    "typings/main.d.ts/",
    "app/interfaces/interfaces.d.ts"
  ])
    .pipe(tsProject())
    .on("error", function (err) {
      process.exit(1);
    })
    .js.pipe(gulp.dest("app/"));
});

var tsTestProject = tsc.createProject("tsconfig.json");

gulp.task("build-test", function () {
  return gulp.src([
    "test/**/**/*.step.ts",
    "typings/main.d.ts/",
    "app/interfaces/interfaces.d.ts"
  ])
    .pipe(tsTestProject())
    .on("error", function (err) {
      process.exit(1);
    })
    .js.pipe(gulp.dest("test/"));
});

gulp.task("build", function (cb) {
  runSequence(["build-app", "build-test"], cb);
});

//******************************************************************************
//* TEST
//******************************************************************************
gulp.task("istanbul:hook", function () {
  return gulp.src(['app/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: min_coverage } }))
    .on("error", function (err) {
      process.exit(1);
    });
});

gulp.task("test", ["istanbul:hook"], function () {
  return gulp.src("test/**/*.feature")
    .pipe(cucumber({
      "steps": "test/features/**/*.js",
      "format": "pretty"
    }))
    .pipe(istanbul.writeReports())
    .on("error", function (err) {
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
    });
});

//******************************************************************************
//* DEV SERVER
//******************************************************************************
gulp.task("watch", ["default"], function () {

  browserSync.init({
    server: "."
  });

  gulp.watch(["app/**/**.ts", "test/**/*.ts"], ["default"]);
  gulp.watch("dist/*.js").on('change', browserSync.reload);
});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("default", function () {
  runSequence("lint", "build", "test")
});