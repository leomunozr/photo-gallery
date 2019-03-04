var babelify = require('babelify'),
  browserify = require("browserify"),
  connect = require("gulp-connect"),
  fs = require('fs'),
  glob = require('glob'),
  gulp = require('gulp'),
  imageResize = require('gulp-image-resize');
  path = require('path'),
  rename = require("gulp-rename"),
  source = require("vinyl-source-stream"),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  vendors = [
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-route/angular-route.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
    'node_modules/angulargrid/angulargrid.js'];

var jsSources = glob.sync('./!(build|node_modules|bower_components)/*.js');

gulp.task('build', ['build:app', 'build:vendor', 'build:html', 'build:css']);

gulp.task('build:app', function() {
  console.log('Building...');
  console.log(jsSources) 
  return browserify({
    entries: jsSources
  })
    .transform(babelify.configure({
      presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('build:vendor', () => {
  return browserify({ entries: vendors })
    .bundle()
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('build:html', () => {
  gulp.src([
    '**/*.html',
    '!node_modules/**',
    '!build/**',
  ])
    .pipe(gulp.dest('./build'));
});

gulp.task('build:css', function () {
  gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    './css/styles.css'
  ])
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('listImages', function() {
  console.log("Listing files...");

  const basePath = 'images';
  var images = [];

  var list_files = function(dir) {
    var files = fs.readdirSync(dir);

    files.forEach(file => {
      // No listar las imágenes minificadas
      if (file.includes('.min')) return;

      var filePath = path.join(dir, file);
      var stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        console.log(file + ' directory found.');
        list_files(filePath);
      }

      else {
        var image = {
          'id': file,
          'name': file,
          'category': path.dirname(path.relative(basePath, filePath)),
          'src': path.relative('.', filePath),
          'min': path.relative('.', filePath).replace('.jpg', '.min.jpg')
        }
        images.push(image);
      }
    });

    return images;
  }

  var list = list_files(basePath);

  images.sort(function(a, b) {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  });
  console.log(list);

  fs.writeFileSync('js/images.json', JSON.stringify(images, null, 4));
});

gulp.task('minify', function() {
  gulp.src(['images/**/*.jpg', '!images/**/*.min.*'])
    // .pipe(imageResize({ width: 600 }))
    .pipe(rename(function(path) { path.basename += '.min'}))
    .pipe(gulp.dest('images'));
});

gulp.task('serve', function() {
  connect.server({ root: 'build' });
});

gulp.task('default', ['listImages', 'minify', 'build', 'watch', 'serve']);

gulp.task('watch', function() {
  gulp.watch(jsSources, ['build']);
  gulp.watch('images/**', ['listImages', 'build']);
});
