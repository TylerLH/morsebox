gulp = require 'gulp'
browserify = require 'browserify'
source     = require 'vinyl-source-stream'
plugins = do require 'gulp-load-plugins'

gulp.task 'scripts', ->
  browserify
    entries: ['./src/js/app.coffee']
    extensions: ['.coffee']
  .bundle()
  .pipe source('app.js')
  .pipe gulp.dest './dist/js/'

gulp.task 'watch', ['default'], ->
  gulp.watch './src/*.coffee', ['scripts']

  gulp.src '.'
  .pipe plugins.webserver
    livereload: true
    open: true

gulp.task 'serve', ->
  gulp.src '.'
  .pipe plugins.webserver

gulp.task 'default', ['scripts']