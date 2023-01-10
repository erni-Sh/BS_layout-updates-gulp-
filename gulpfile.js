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
  ftp = require('vinyl-ftp');
  // keys = require('./config_secret.js'),

const distFolder = 'dist/';

gulp.task('scss', function(){
  return gulp.src('app/scss/*.scss')
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
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: 'static/css'}))
    .pipe(gulp.dest(`${distFolder}css`))
    .pipe(browserSync.reload({stream: true}))
});

// gulp.task('pug', function(){
//   return gulp.src(['app/pug/**/*.pug', '!app/pug/includes/**/*'])
//     .pipe(pug({pretty: true}).on('error', notify.onError({
//       message: "Error: <%= error.message %>",
//       title: "PUG ERROR"
//     })))
//     .pipe(rename({ extname: '.php' }))
//     .pipe(gulp.dest(distFolder))
//     .pipe(browserSync.reload({stream: true}))
// });

gulp.task('pug-local', function(){
  return gulp.src('app/pug/*.pug')
    .pipe(pug({pretty: true}).on('error', notify.onError({
      message: "Error: <%= error.message %>",
      title: "PUG ERROR"
    })))
    .pipe(gulp.dest(distFolder))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function () {
  return gulp.src('app/js/*.js')
    // .pipe(uglify())
    // .pipe(concat('custom.js'))
    .pipe(gulp.dest(`${distFolder}js`));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    // ui: {
    //   port: 8080
    // },
    server: {
      baseDir: distFolder,
      routes : {
        '/node_modules' : './node_modules'
      }
    }
  });
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
//   gulp.watch('app/scss/**/*.scss', gulp.series('scss','deploy'));
//   gulp.watch('app/pug/**/*.pug', gulp.series('pug','deploy'));
//   gulp.watch('app/js/**/*.js', gulp.series('js','deploy'));
// });

gulp.task('watch-local', function(done){
  gulp.watch('app/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('app/pug/**/*.pug', gulp.series('pug-local'));
  gulp.watch('app/js/**/*.js', gulp.series('js'));
  done();
});

// -------------------------------------------------
// gulp.task('online', gulp.series('scss', 'pug', 'js', 'deploy', 'watch'))

gulp.task('default', gulp.series('scss', 'pug-local', 'js', 'watch-local', 'browser-sync'))