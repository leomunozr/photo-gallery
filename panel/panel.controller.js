import imagesOrig from '../js/images.json';

class PanelController {
  constructor($rootScope, $routeParams) {
    this.category = $rootScope.currentCategory || 'all';
    this.slides = this.category === 'all' ? imagesOrig : imagesOrig.filter((slide) => {
      return slide.category === this.category
    });
    this.selected = parseInt($routeParams.img);
  }
}

PanelController.$inject = ['$rootScope', '$routeParams'];
export default PanelController;
