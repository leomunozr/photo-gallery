import MainController from './main.controller';
import ImageModalController from './imageModal.controller';

angular.module('app', [
  'ngAnimate',
  'ui.bootstrap',
  'angularGrid',
  'infinite-scroll'
])
  .value('THROTTLE_MILLISECONDS', 350)
  .controller('MainCtrl', MainController)
  .controller('ImageModalController', ImageModalController)
  .run(($templateCache) => {
    $templateCache.put('imageModal.html', '../views/imageModal.html');
  });
