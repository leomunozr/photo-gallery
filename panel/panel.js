import angular from 'angular';
import panelComponent from './panel.component';

let panelModule = angular.module('app.panel', [])
  .component('imgPanel', panelComponent);

export default panelModule;
