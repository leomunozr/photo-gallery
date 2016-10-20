import MainController from './main.controller';
import Panel from '../panel/panel';

angular.module('app', [
  'ngAnimate',
  'angularGrid',
  Panel.name
])
  .value('THROTTLE_MILLISECONDS', 350)
  .controller('MainCtrl', MainController)
  .run(($templateCache) => {
    $templateCache.put('panel.html', '../panel/panel.html');
  });
