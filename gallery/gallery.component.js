import controller from './gallery.controller';

let templateUrl = './gallery/gallery.html'

let galleryComponent = {
  restrict: 'E',
  bindings: {
  },
  templateUrl,
  controller,
  controllerAs: 'vm'
};

export default galleryComponent;
