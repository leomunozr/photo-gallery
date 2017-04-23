import angular from 'angular';
import panelComponent from './panel.directive';
import carouselNavDirective from './carouselNav.directive';

let panelModule = angular.module('app.panel', [
  'ngAnimate',
  'ui.bootstrap'
])
  .directive('imgPanel', panelComponent)
  .directive('carouselNav', carouselNavDirective);

export default panelModule;
