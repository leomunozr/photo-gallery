import angular from 'angular';
import panelComponent from './panel.directive';

let panelModule = angular.module('app.panel', [
  'ngAnimate',
  'ui.bootstrap'
])
  .directive('imgPanel', panelComponent);

export default panelModule;
