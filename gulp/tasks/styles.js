import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import autoPrefixer from 'gulp-autoprefixer';
import mediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const styles = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: true })
        // .pipe(app.plugins.plumber())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(mediaQueries())
        .pipe(autoPrefixer({
            grid: true,
            cascade: true,
            overrideBrowserslist: ['last 2 versions']
        }))
        // uncommit for expanded file styles
        // .pipe(app.gulp.dest(app.path.build.css))
        // .pipe(cleanCss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream())
};