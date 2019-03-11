const babelify = require('babelify');
const browserify = require("browserify");
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');
const connect = require("gulp-connect");
const fs = require('fs');
const glob = require('glob');
const gulp = require('gulp');
const path = require('path');
const sharp = require('sharp');
const source = require("vinyl-source-stream");
const uglify = require('gulp-uglify');

const vendors = [
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
    'node_modules/bulma/css/bulma.min.css',
    './css/styles.css'
  ])
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(BUILD_DIR_CSS));
});

gulp.task('listImages', () => {
  console.info('Generating list of images...');

  const basePath = path.resolve(__dirname, 'images');
  const imagesList = listFiles(basePath);

  fs.writeFileSync('js/images.json', JSON.stringify(imagesList, null, 2));
  
  console.info('List of images generated successfully.');

  function listFiles(dir) {
    const files = fs.readdirSync(dir);
    
    return files.map((file) => {
      if (file === 'min') return;

      const filePath = path.join(dir, file);
      const minPath = path.join(dir, 'min', file);
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
        'min': path.relative('.', minPath)
      }
    })
      .reduce((arr, img) => arr.concat(img), [])
      .filter((img) => img)
      .sort((a, b) => {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
  };
});

gulp.task('resizeImages', () => {
  const imagesPath = path.resolve(__dirname, 'images');
  console.info('Starting reading images from: ', imagesPath);

  readImages(imagesPath);

  function readImages(dir) {

    fs.readdir(dir, (err, files) => {
      
      files.map(file => {
        if (file === 'min') return;

        const filePath = path.join(dir, file);
        const fileStats = fs.statSync(filePath);

        if (fileStats.isDirectory()) {
          console.info(`Found dir ${filePath}. Reading new dir...`);
          readImages(filePath);
        }
        else if (fileStats.isFile()) {
          const minPath = path.join(dir, 'min');
          fs.mkdir(minPath, (err) => { if (err) return });
          
          sharp(filePath)
            .resize(500)
            .toFile(path.join(minPath, file))
            .catch(err => console.error);
        }
      });

      console.info(`Finished reading dir ${dir}.`);
    });
  }
});

gulp.task('build', ['build:app', 'build:vendor', 'build:html', 'build:css']);

gulp.task('deploy', ['listImages', 'resizeImages', 'build']);

gulp.task('serve', () => {
  connect.server({ root: BUILD_DIR });
});

gulp.task('default', ['listImages', 'resizeImages', 'build', 'watch', 'serve']);

gulp.task('watch', () => {
  gulp.watch(jsSources, ['build:app']);
  gulp.watch(['**/*.html', '!node_modules/**', '!build/**'], ['build:html']);
  gulp.watch('css/styles.css', ['build:css']);
});
