export const copyFiles = () => {
    return app.gulp.src(app.path.src.files)
        .pipe(app.gulp.dest(app.path.build.files))
};

export const copyFonts = () => {
    return app.gulp.src(app.path.src.fonts)
        .pipe(app.gulp.dest(app.path.build.fonts))
};