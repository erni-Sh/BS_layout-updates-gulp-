const gulp = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  browserSync = require('browser-sync').create(),
  rename = require('gulp-rename'),
  pug = require('gulp-pug'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  notify = require('gulp-notify'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  wait = require('gulp-wait'),
  gutil = require('gutil'),
  clean = require('gulp-rimraf'),
  ftp = require('vinyl-ftp');
  // keys = require('./config_secret.js'),

const distFolder = 'dist/';
const sourceFolder = 'src';

gulp.task('pug', function(){
  return gulp.src([
    `${sourceFolder}/**/*.pug`,
    `!${sourceFolder}/**/_*.pug`,
  ])
    .pipe(pug({pretty: true}).on('error', notify.onError({
      message: "Error: <%= error.message %>",
      title: "PUG ERROR"
    })))
    .pipe(gulp.dest(distFolder))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scss', function(){
  return gulp.src(`${sourceFolder}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(wait(1500))
    //compressed
    .pipe(sass({outputStyle: 'expanded', includePaths: ['node_modules']}).on('error', notify.onError({
      message: "Error: <%= error.message %>",
      title: "SASS ERROR"
    })))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    // .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: 'css'}))
    .pipe(gulp.dest(`${distFolder}`))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function () {
  return gulp.src([
      `${sourceFolder}/**/*.js`,
      `!${sourceFolder}/**/_*.js`,
    ])
    // .pipe(uglify())
    // .pipe(concat('custom.js'))
    .pipe(gulp.dest(`${distFolder}`));
});

gulp.task('assets', function () {
  return gulp.src([
      `${sourceFolder}/**/*.svg`,
      `!${sourceFolder}/**/_svg/*.svg`, //for includes svg in template
      `${sourceFolder}/**/*.jpeg`,
      `${sourceFolder}/**/*.jpg`,
      `${sourceFolder}/**/*.png`,
      `${sourceFolder}/**/*.css`,
    ])
    .pipe(gulp.dest(`${distFolder}`));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    port: 4040,
    ui: false,
    open: false,
    notify: true,
    server: {
      baseDir: distFolder,
      routes : {
        '/node_modules' : './node_modules'
      }
    }
  });
});

gulp.task('clean', function() {
  return gulp.src(`${distFolder}/*`, { read: false }).pipe(clean());
});

// gulp.task( 'deploy', function () {
//
//   var conn = ftp.create({
//     host:     keys.host,
//     port:     keys.port,
//     user:     keys.user,
//     password: keys.password,
//     parallel: 10,
//     timeOffset: 120, // смещение часового пояса сервера
//     log:      gutil.log
//   });
//
//   var globs = [ // запрет на синхронизацию
//     '!sftp-config.json',
//   ];
//   // using base = '.' will transfer everything to /public_html correctly
//   return gulp.src( globs, { base: '.', buffer: false } )
//     .pipe( conn.newer( '/' )) // only upload newer files
//     .pipe( conn.dest( '/' ) )
//     .pipe(notify({
//       message: "Да ты крут, чувак)",
//       title: "ЗАГРУЖЕНО НА СЕРВЕР!",
//       onLast: true
//     }));
// });

// gulp.task('watch', function(){
//   gulp.watch('app/css/**/*.css', gulp.series('css','deploy'));
//   gulp.watch('app/not_serve/**/*.not_serve', gulp.series('not_serve','deploy'));
//   gulp.watch('app/js/**/*.js', gulp.series('js','deploy'));
// });

gulp.task('watch-local', function(done){
  gulp.watch([
    `${sourceFolder}/**/*.svg`,
    `${sourceFolder}/**/_svg/*.svg`,
    `${sourceFolder}/**/*.jpeg`,
    `${sourceFolder}/**/*.jpg`,
    `${sourceFolder}/**/*.png`,
    `${sourceFolder}/**/*.css`,
  ], gulp.series('assets'));
  gulp.watch(`${sourceFolder}/**/*.scss`, gulp.series('scss'));
  gulp.watch(`${sourceFolder}/**/*.pug`, gulp.series('pug'));
  gulp.watch(`${sourceFolder}/**/*.js`, gulp.series('js'));
  done();
});

// -------------------------------------------------
// gulp.task('online', gulp.series('css', 'pug', 'js', 'deploy', 'watch'))

gulp.task('default', gulp.series('clean', 'pug', 'scss', 'js', 'assets', 'watch-local', 'browser-sync'))