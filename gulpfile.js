'use strict'

var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    minify      = require('gulp-minify-css'),
    concat      = require('gulp-concat'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    plumber     = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith');
//    ,
//    neat        = require('node-neat').includePaths;

//////////////////////////////
// PATHS
//////////////////////////////
var path = {
  sassWatch: [
    'source/scss/*.scss',
    'source/scss/**/*.scss'
  ],
  sass_src_S: 'source/scss/style.scss',
  sass_src_P: 'source/scss/print.scss',
  sass_dest: 'css',
  js_lint_src: [
      'js/*.js'
  ],
  js_src : [
      'source/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      'source/js/*.js'
  ],
  js_dest : 'js/'
};

//////////////////////////////
// BrowserSync
//////////////////////////////
gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        proxy: "local.dev",
        notify: false
    });
});

gulp.task('bs-reload', function (){
    browserSync.reload();
});

//////////////////////////////
// JS Tasks
//////////////////////////////
gulp.task('js', function () {
    gulp.src(path.js_src)
        .on('error',console.log.bind(console))
        .pipe(uglify())
        .on('error',console.log.bind(console))
        .pipe(concat('main.js'))
        .on('error',console.log.bind(console))
        .pipe(gulp.dest('js'))
        .on('error',console.log.bind(console));
});

//////////////////////////////
// SASS Tasks
//////////////////////////////
gulp.task('sass', function(){
    gulp.src(path.sass_src_S)
        .pipe(sass({
            includePaths: ['styles']
        }))
        .on('error',console.log.bind(console))
        .pipe(minify())
        .on('error',console.log.bind(console))
        .pipe(concat('style.css'))
        .on('error',console.log.bind(console))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}))
        .on('error',console.log.bind(console));
    gulp.src(path.sass_src_P)
        .pipe(sass({
            includePaths: ['styles']
        }))
        .on('error',console.log.bind(console))
        .pipe(minify())
        .on('error',console.log.bind(console))
        .pipe(concat('print.css'))
        .on('error',console.log.bind(console))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}))
        .on('error',console.log.bind(console));
});

//////////////////////////////
// SPRITE Tasks
//////////////////////////////
gulp.task('sprite', function () {
  var spriteData = gulp.src('source/img/sprite/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgPath: '../img/sprite.png'
  })).on('error',console.log.bind(console));
  spriteData.img.pipe(gulp.dest('img/')).on('error',console.log.bind(console));
  spriteData.css.pipe(gulp.dest('source/scss/config/')).on('error',console.log.bind(console));
});

//////////////////////////////
// Watch Tasks
//////////////////////////////
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(path.js_src, ['js']).on('error',console.log.bind(console));
    gulp.watch(path.sassWatch, ['sass']).on('error',console.log.bind(console));
    gulp.watch('source/img/sprite/*.*', ['sprite']).on('error',console.log.bind(console));

    gulp.watch('js/*.*').on('change', browserSync.reload);
});

//////////////////////////////
//Default Tasks
//////////////////////////////
gulp.task('default', [
    'sass',
    'js',
    'watch',
    'sprite'
]);
