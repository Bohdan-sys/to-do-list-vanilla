import gulpPlumber from "gulp-plumber";
import browserSync from "browser-sync";
import newer from "gulp-newer";

export const plugins = {
    plumber: gulpPlumber,
    browserSync: browserSync,
    newer: newer
};