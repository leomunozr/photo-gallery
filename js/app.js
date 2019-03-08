import MainController from './main.controller';
import GalleryController from '../gallery/gallery.controller';
import PanelController from '../panel/panel.controller';

import Gallery from '../gallery/gallery';
import Panel from '../panel/panel';

angular.module('app', [
  'ngAnimate',
  'ngRoute',
  'angularGrid',
  Gallery.name,
  Panel.name
])
  .value('THROTTLE_MILLISECONDS', 350)
  .controller('MainCtrl', MainController)
  .config(($routeProvider) => { 
    $routeProvider
      .when('/', {
        templateUrl: 'gallery/gallery.html',
        controller: GalleryController,
        controllerAs: 'vm'
      })
      .when('/:category', {
        templateUrl: 'gallery/gallery.html',
        controller: GalleryController,
        controllerAs: 'vm'
      })
      .when('/image/:img', {
        template: '<img-panel></img-panel>',
        controller: PanelController,
        controllerAs: 'vm'
      })
  });
