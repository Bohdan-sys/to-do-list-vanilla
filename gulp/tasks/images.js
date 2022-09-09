import imagemin from "gulp-imagemin";

export const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber())
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 4
        }))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.gulp.src(app.path.src.svg))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browserSync.stream())
};