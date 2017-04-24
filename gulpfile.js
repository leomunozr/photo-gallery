var babelify = require('babelify'),
  browserify = require("browserify"),
  connect = require("gulp-connect"),
  fs = require('fs'),
  glob = require('glob'),
  gulp = require('gulp'),
  path = require('path'),
  source = require("vinyl-source-stream");

var jsSources = glob.sync('./!(build|node_modules|bower_components)/*.js');

gulp.task('build', function() {
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
    .pipe(gulp.dest('./build'));
});

gulp.task('listImages', function() {
  console.log("Listing files...");

  const basePath = 'images';
  var images = [];

  var list_files = function(dir) {
    var files = fs.readdirSync(dir);

    files.forEach(file => {
      var filePath = path.join(dir, file);
      var stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        console.log(file + ' is a directory.');
        list_files(filePath);
      }

      else {
        var image = {
          'id': file,
          'name': file,
          'category': path.dirname(path.relative(basePath, filePath)),
          'src': path.relative('.', filePath)
        }
        images.push(image);
      }

    });

    fs.writeFileSync('js/images.json', JSON.stringify(images, null, 4));
    return images;
  }

  var list = list_files(basePath);
  console.log(list);

});

gulp.task('serve', function() {
  connect.server();
});

gulp.task('default', ['listImages', 'build', 'watch', 'serve']);

gulp.task('watch', function() {
  gulp.watch(jsSources, ['build']);
  gulp.watch('images/**', ['listImages', 'build']);
});
