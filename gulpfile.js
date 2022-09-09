import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';
import { copyFiles, copyFonts } from './gulp/tasks/copy.js';
import { clean } from './gulp/tasks/clean.js';
import { server } from './gulp/tasks/server.js';
import { html } from './gulp/tasks/html.js';
import { styles } from './gulp/tasks/styles.js';
import { scripts } from './gulp/tasks/scripts.js';
import { images } from './gulp/tasks/images.js';

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins
};

function watcher() {
    gulp.watch(path.watch.fonts, copyFonts);
    gulp.watch(path.watch.files, copyFiles);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, styles);
    gulp.watch(path.watch.js, scripts);
    gulp.watch(path.watch.images, images);
};

const devTasks = gulp.parallel(copyFiles, copyFonts, html, styles, scripts, images);
const coreTasks = gulp.series(clean, devTasks, gulp.parallel(watcher, server));

gulp.task('default', coreTasks);