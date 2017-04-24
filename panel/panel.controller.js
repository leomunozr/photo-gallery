import imagesOrig from '../js/images.json';
import { sortByName } from '../helpers/helpers';

class PanelController {
  constructor($rootScope, $routeParams) {
    this.category = $rootScope.currentCategory || 'all';
    this.slides = $rootScope.images || imagesOrig;
    let imageId = $routeParams.img;
    this.selected = this.slides.findIndex(slide => slide.id === imageId);
  }
}

PanelController.$inject = ['$rootScope', '$routeParams'];
export default PanelController;
