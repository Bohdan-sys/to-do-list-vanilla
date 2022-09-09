import webpackStream from "webpack-stream";

export const scripts = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: true })
        .pipe(app.plugins.plumber())
        .pipe(webpackStream({
            mode: 'development',
            output: {
                filename: 'script.min.js'
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browserSync.stream())
};