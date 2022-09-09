import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());
const distFolder = './dist';
const srcFolder = './src';

export const path = {
    build: {
        html: `${distFolder}/`,
        css: `${distFolder}/css/`,
        js: `${distFolder}/js/`,
        images: `${distFolder}/img/`,
        fonts: `${distFolder}/fonts/`,
        files: `${distFolder}/files/`
    },
    src: {
        html: `${srcFolder}/*.html`,
        scss: `${srcFolder}/styles/style.scss`,
        js: `${srcFolder}/js/script.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        fonts: `${srcFolder}/fonts/**/*.*`,
        files: `${srcFolder}/files/**/*.*`
    },
    watch: {
        html: `${srcFolder}/**/*.html`,
        scss: `${srcFolder}/styles/**/*.scss`,
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
        fonts: `${srcFolder}/fonts/**/*.*`,
        files: `${srcFolder}/files/**/*.*`
    },
    rootFolder: rootFolder,
    clean: distFolder,
    srcFolder: srcFolder,
    distFolder: distFolder
};