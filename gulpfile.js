const babelify = require('babelify');
const browserify = require("browserify");
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');
const connect = require("gulp-connect");
const fs = require('fs');
const glob = require('glob');
const gulp = require('gulp');
const path = require('path');
const source = require("vinyl-source-stream");
const uglify = require('gulp-uglify');

const fonts = 'node_modules/bootstrap/fonts/*';
const vendors = [
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/angular/angular.min.js',
  'node_modules/angular-animate/angular-animate.min.js',
  'node_modules/angular-route/angular-route.js',
  'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
  'node_modules/angulargrid/angulargrid.js'
];
const jsSources = glob.sync('./!(build|node_modules|bower_components)/*.js');
const BUILD_DIR = path.resolve(__dirname, 'build');
const BUILD_DIR_JS = path.resolve(BUILD_DIR, 'js');
const BUILD_DIR_CSS = path.resolve(BUILD_DIR, 'css');
const BUILD_DIR_FONTS = path.resolve(BUILD_DIR, 'fonts');

gulp.task('build', ['build:app', 'build:vendor', 'build:html', 'build:css']);

gulp.task('build:app', () => {
  console.info('Building from: ', jsSources);

  return browserify({
    entries: jsSources
  })
    .transform(babelify.configure({
      presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(BUILD_DIR_JS));
});

gulp.task('build:vendor', () => {
  console.info('Building vendor sources...');

  return browserify({ entries: vendors })
    .bundle()
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(BUILD_DIR_JS));
});

gulp.task('build:html', () => {
  console.info('Copying HTML files to build dir...');

  gulp.src([
    '**/*.html',
    '!node_modules/**',
    '!build/**',
  ])
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('build:css', () => {
  console.info('Copying CSS files to build dir...');

  gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    './css/styles.css'
  ])
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(BUILD_DIR_CSS));
});

gulp.task('build:fonts', () => {
  console.info('Copying font files to build dir...');

  gulp.src(fonts)
    .pipe(gulp.dest(BUILD_DIR_FONTS));
});

gulp.task('listImages', () => {
  console.info('Generating list of images...');

  const basePath = path.resolve(__dirname, 'images');

  function listFiles(dir) {
    const files = fs.readdirSync(dir);
    
    return files.map((file) => {
      // No listar las imágenes minificadas
      if (file.includes('.min')) return;

      const filePath = path.join(dir, file);
      const fileStats = fs.statSync(filePath);
      
      if (fileStats.isDirectory()) {
        console.info(`Found directory in ${file}.`);
        return listFiles(filePath);
      }

      else return {
        'id': file,
        'name': file,
        'category': path.dirname(path.relative(basePath, filePath)),
        'src': path.relative('.', filePath),
        'min': path.relative('.', filePath).replace('.jpg', '.min.jpg')
      }
    })
    .reduce((arr, img) => arr.concat(img), []);
  };

  const imagesList = listFiles(basePath);

  imagesList.sort((a, b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  });

  fs.writeFileSync('js/images.json', JSON.stringify(imagesList, null, 2));
  console.info('List of images generated successfully.');
});

gulp.task('minify', function() {
  gulp.src(['images/**/*.jpg', '!images/**/*.min.*'])
    // .pipe(imageResize({ width: 600 }))
    .pipe(rename(function(path) { path.basename += '.min'}))
    .pipe(gulp.dest('images'));
});

gulp.task('serve', () => {
  connect.server({ root: BUILD_DIR });
});

gulp.task('default', ['listImages', 'minify', 'build', 'watch', 'serve']);

gulp.task('watch', () => {
  gulp.watch(jsSources, ['build']);
  gulp.watch('images/**', ['listImages', 'build']);
});
