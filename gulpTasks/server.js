const gulp = require('gulp')
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')

gulp.task('watch', () => {
    watch('app/**/*.html', () => gulp.setMaxListeners('app.html'))
    watch('app/**/*.css', () => gulp.setMaxListeners('app.css'))
    watch('app/**/*.js', () => gulp.setMaxListeners('app.js'))
    watch('assets/**/*.*', () => gulp.setMaxListeners('app.assets'))
})

gulp.task('server', ['watch'], () => {
    return gulp.src('public')
    .pipe(webserver({
        livereload: true,
        port: 3000,
        open: true
    }))
})