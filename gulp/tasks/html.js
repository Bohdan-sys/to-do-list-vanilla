import fileinclude from 'gulp-file-include';

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber())
        .pipe(fileinclude())
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream())
};