const gulp = require('gulp');

// HTML
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const webImagesHTML = require("gulp-web-images-html");

// SASS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const webImagesCSS = require("gulp-web-images-css");

const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const groupMedia = require('gulp-group-css-media-queries');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const changed = require('gulp-changed');

// Images
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
let webpImagesHtml = require("gulp-web-images-html");


gulp.task('clean:prod', function (done) {
	if (fs.existsSync('./dist/')) {
		return gulp
			.src('./dist/', { read: false })
			.pipe(clean({ force: true }));
	}
	done();
});

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

gulp.task('html:prod', function () {
	return gulp
		.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
		.pipe(changed('./dist/'))
		.pipe(plumber(plumberNotify('HTML')))
		.pipe(fileInclude(fileIncludeSetting))
		.pipe(webImagesHTML({mode: 'all'}))
		.pipe(htmlclean())
		.pipe(gulp.dest('./dist/'));
});

gulp.task('sass:prod', function () {
	return gulp
		.src('./src/scss/*.scss')
		.pipe(changed('./dist/css/'))
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(autoprefixer())
		.pipe(sassGlob())
		.pipe(webImagesCSS({mode: 'all'}))
		.pipe(groupMedia())
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('images:prod', function () {
  return gulp
    .src(['./src/img/**/*.*', '!./src/img/**/*.svg'])
    .pipe(changed('./dist/img/'))
    .pipe(avif()) // Exclude SVG from AVIF conversion
    .pipe(gulp.src('./src/img/**/*.*'))
    .pipe(webp()) // Exclude SVG from WebP conversion
    .pipe(gulp.dest('./dist/img/'))
    .pipe(gulp.src('./src/img/**/*'))
    .pipe(changed('./dist/img/'))
    .pipe(imagemin({ verbose: true })) // Exclude SVG from general imagemin
    .pipe(gulp.dest('./dist/img/'));
});


gulp.task('fonts:prod', function () {
	return gulp
		.src('./src/fonts/**/*')
		.pipe(changed('./dist/fonts/'))
		.pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('files:prod', function () {
	return gulp
		.src('./src/files/**/*')
		.pipe(changed('./dist/files/'))
		.pipe(gulp.dest('./dist/files/'));
});

gulp.task('js:prod', function () {
	return gulp
		.src('./src/js/*.js')
		.pipe(changed('./dist/js/'))
		.pipe(plumber(plumberNotify('JS')))
		.pipe(babel())
		.pipe(webpack(require('./../webpack.config.js')))
		.pipe(gulp.dest('./dist/js/'));
});

const serverOptions = {
	livereload: true,
	open: true,
};

gulp.task('server:prod', function () {
	return gulp.src('./dist/').pipe(server(serverOptions));
});
