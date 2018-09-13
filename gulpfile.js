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


/*
To concatinate all files to a single one
outFile: 'output.js'
*/
let tsconfig = JSON.parse(fs.readFileSync('tsconfig.json'));
delete tsconfig.compilerOptions.outDir;
tsconfig.compilerOptions.srcDir = 'src/front';

gulp.task('frontjs', (cb) => {
    pump([
        gulp.src('src/front/**/*.ts'),
        ts(tsconfig.compilerOptions),
        jsMinify(),
        concat('scripts.js'),
        gulp.dest('build/front'),
        browserSync.reload({ stream: true })
    ],
        cb);
});

gulp.task('css', (cb) => {
    pump([
        gulp.src('src/front/**/*.scss'),
        sass(),
        cssMinify(),
        concat('styles.css'),
        gulp.dest('build/front'),
        browserSync.reload({ stream: true })
    ],
        cb);
});

gulp.task('other', (cb) => {
    pump([
        gulp.src('src/**/!(*.ts|*.scss)'),
        gulp.dest('build'),
        browserSync.reload({ stream: true })
    ],
        cb);
});

gulp.task('backjs', (cb) => {
    pump([
        gulp.src('src/back/**/*.ts'),
        ts(tsconfig.compilerOptions),
        concat('app.js'),
        gulp.dest('build/back'),
        browserSync.reload({ stream: true })
    ],
        cb);
});

gulp.task('clean', () => {
    return del.sync('build');
});

gulp.task('default', ['clean', 'frontjs', 'css', 'other', 'backjs']);

gulp.task('watch', () => {
    gulp.watch('src/front/**/*.ts', ['frontjs']);
    gulp.watch('src/front/**/*.scss', ['css']);
    gulp.watch('src/**/!(*.ts|*.scss)', ['other']);
    gulp.watch('src/back/**/*.ts', ['backjs']);
});

gulp.task('run', ['nodemon'], () => {
    browserSync.init(null, {
        //baseDir: 'build/front',
        proxy: "http://localhost:3000",
        port: 7000
    });
});

gulp.task('nodemon', (cb) => {
    let started = false;
    return nodemon({
        script: 'build/back/app.js'
    }).on('start', () => {
        // to avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
        }
    });
});