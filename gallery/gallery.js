import angular from 'angular';
import galleryComponent from './gallery.component';

let galleryModule = angular.module('app.gallery', [])
  .component('gallery', galleryComponent);

export default galleryModule;
