import angular from 'angular';
import panelComponent from './panel.component';

let panelModule = angular.module('app.panel', [
  'ngAnimate',
  'ui.bootstrap'
])
  .component('imgPanel', panelComponent);

export default panelModule;
