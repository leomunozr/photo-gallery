var gulp = require('gulp'),
  babelify = require('babelify'),
  browserify = require("browserify"),
  connect = require("gulp-connect"),
  source = require("vinyl-source-stream"),
  fs = require('fs'),
  path = require('path');

gulp.task('build', function() {
  console.log('Building...');
  return browserify({
    entries: [
      'js/app.js',
      'js/main.controller.js',
      'js/imageModal.controller.js'
    ]
  })
    .transform(babelify.configure({
        presets : ["es2015"]
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
  gulp.watch(['js/*', '!js/images.json'], ['build']);
  gulp.watch('images/**', ['listImages', 'build']);
});
