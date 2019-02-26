var fs = require('fs'),
    path = require('path'),
    del = require('del'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    express = require('express'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    useref = require('gulp-useref'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    sleet = require('gulp-sleet'),
    eslint = require('gulp-eslint'),
    gulpif = require('gulp-if'),
    preprocess = require('gulp-preprocess');

var libs = [
        'jquery', 'handlebars/runtime', 'lodash/collection'],
    options = {
        entries: ['./main.js'],
        extensions: ['.html', '.hbs'],
        basedir: './scripts',
        debug: false,
        cache: {}, packageCache: {}
    },
    requireDrizzleModules = function(dir, root, b) {
        fs.readdirSync(dir).forEach(function(file) {
            var filename = path.join(dir, file), ext;
            if (fs.statSync(filename).isDirectory()) {
                requireDrizzleModules(filename, root, b);
            } else {
                ext = path.extname(filename);
                if (ext === '.js' || ext === '.hbs' || ext === '.html') {
                    filename = path.relative(root, filename);
                    filename = path.join(path.dirname(filename), path.basename(filename, ext));
                    filename = './' + filename.replace(/\\/g, '/');
                    b.require({file: filename}, {basedir: root});
                }
            }
        });
    },
    main = function() {
        var b = watchify(browserify(options));
        b.on('update', main);
        b.on('log', gutil.log);
        requireDrizzleModules('./scripts/app', './scripts', b);
        b.require({ file: './config/key-config' }, { basedir: './scripts' });
        b.external(libs);
        gulp.run('lint');

        return b.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./bundle'));
    };

gulp.task('lint', function() {
    return gulp.src('scripts/**/*.js')
        .pipe(eslint())
        .pipe(eslint.formatEach());
});

gulp.task('lint-build', function() {
    return gulp.src(['scripts/**/*.js', '!scripts/vendors/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('common', function() {
    var b = browserify();
    b.require(libs);

    return b.bundle()
        .pipe(source('common.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./bundle'))
});

gulp.task('build-main', ['sleet'], function() {
    var b = browserify(options);
    requireDrizzleModules('./scripts/app', './scripts', b);
    b.require({ file: './config/key-config' }, { basedir: './scripts' });
    b.external(libs);

    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./bundle'));
});

gulp.task('sleet', function() {
    return gulp.src('./**/*.sleet')
        .pipe(sleet())
        .pipe(gulp.dest('./'));
});

// gulp.task('main', ['sass'], main);

gulp.task('main', ['sleet'], main);

gulp.task('sass:watch', function () {
    return gulp.watch('./styles/**/*.scss', ['sass']);
});


gulp.task('build', ['clean-build', 'lint', 'common', 'build-main', 'files'], function() {
    return gulp.src('./index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', csso()))
        .pipe(gulpif('!index.html', rev()))
    
        .pipe(revReplace())
        .pipe(gulpif('index.html', rev()))
        .pipe(gulp.dest('./dist'))
        .on('end', function() {
            gulp.src('./scripts/app/util/compatiblVersion.js').pipe(gulp.dest('./dist/scripts'));
        });
});

gulp.task('default', ['main', 'common'], function() {
    var app = express();

    app.use(function(req, res, next) {
        next();
    });
    app.use(express.static('.'));

    app.listen(8888, function() {
        console.log('Server started at localhost:8888');
    });
});

gulp.task('hello',()=>{
    console.log("hello");
})

