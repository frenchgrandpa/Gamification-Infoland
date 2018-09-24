let fs = require('fs');
let gulp = require('gulp');
let del = require('del');
let pump = require('pump');
let concat = require('gulp-concat');
let ts = require('gulp-typescript');
let jsMinify = require('gulp-uglify');
let sass = require('gulp-sass');
let cssMinify = require('gulp-clean-css');
let browserSync = require('browser-sync').create();
let nodemon = require('gulp-nodemon');
let img = require('gulp-imagemin');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let tsify = require('tsify');
let glob = require('glob');

let tsconfig = JSON.parse(fs.readFileSync('tsconfig.json'));
delete tsconfig.compilerOptions.outDir;
delete tsconfig.compilerOptions.srcDir;

gulp.task('frontjs', (cb) => {
    return browserify({
        basedir: '.',
        entries: glob.sync('src/static/**/*.ts')
    })
        .plugin(tsify, tsconfig.compilerOptions)
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(buffer())
        //.pipe(jsMinify())
        .pipe(gulp.dest('build/static'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('css', (cb) => {
    pump([
        gulp.src('src/static/**/*.scss'),
        sass(),
        cssMinify(),
        concat('styles.css'),
        gulp.dest('build/static'),
        browserSync.reload({ stream: true })
    ],
        cb);
});

gulp.task('img', (cb) => {
    pump([
        gulp.src('src/static/img/**/*.+(png|jpg|gif|svg)'),
        img(),
        gulp.dest('build/static/img'),
        browserSync.reload({ stream: true })
    ],
        cb);
});

gulp.task('other', (cb) => {
    pump([
        gulp.src('src/**/!(*.ts|*.scss|*.png|*.jpg|*.gif|*.svg)'),
        gulp.dest('build'),
        browserSync.reload({ stream: true })
    ],
        cb());
});

gulp.task('backjs', (cb) => {
    pump([
        gulp.src('src/{*.ts,!(static)/**/*.ts}'),
        ts(tsconfig.compilerOptions),
        gulp.dest('build'),
        browserSync.reload({ stream: true })
    ],
        cb);
});



gulp.task('clean', () => {
    return del.sync('build');
});

gulp.task('default', ['frontjs', 'css', 'img', 'other', 'backjs']);

gulp.task('watch', () => {
    gulp.watch('src/static/**/*.ts', ['frontjs']);
    gulp.watch('src/static/**/*.scss', ['css']);
    gulp.watch('src/static/img/**/*.+(png|jpg|gif|svg)', ['img']);
    gulp.watch('src/**/!(*.ts|*.scss|*.png|*.jpg|*.gif|*.svg)', ['other']);
    gulp.watch('src/{*.ts,!(static)/**/*.ts}', ['backjs']);
});

gulp.task('run', ['watch', 'nodemon'], () => {
    browserSync.init(null, {
        //baseDir: 'build',
        proxy: "http://localhost:3000",
        port: 7000
    });
});

gulp.task('nodemon', (cb) => {
    let started = false;
    return nodemon({
        script: 'build/web.js'
    }).on('start', () => {
        // to avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
        }
    });
});
