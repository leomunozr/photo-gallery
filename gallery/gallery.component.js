import controller from './gallery.controller';

let templateUrl = './gallery/gallery.html'

let galleryComponent = {
  restrict: 'E',
  bindings: {
    images: '<',
    enlarge: '&'
  },
  templateUrl,
  controller,
  controllerAs: 'vm'
};

export default galleryComponent;
