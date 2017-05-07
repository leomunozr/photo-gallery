import angular from 'angular';
import panelDirective from './panel.directive';

let panelModule = angular.module('app.panel', [
  'ngAnimate',
  'ui.bootstrap'
])
  .directive('imgPanel', panelDirective)

export default panelModule;
