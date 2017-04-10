import MainController from './main.controller';

import Gallery from '../gallery/gallery';
import Panel from '../panel/panel';

angular.module('app', [
  'ngAnimate',
  'angularGrid',
  Gallery.name,
  Panel.name
])
  .value('THROTTLE_MILLISECONDS', 350)
  .controller('MainCtrl', MainController)
  .run(($templateCache) => {
    $templateCache.put('panel.html', '../panel/panel.html');
    $templateCache.put('gallery.html', '../gallery/gallery.html');
  });
