import imagesOrig from '../js/images.json';
import { sortByName } from '../helpers/helpers';

const GET_ID = (obj, index) => obj[index].id;

class PanelController {

  constructor($rootScope, $routeParams, $scope, $location) {

    this.location = $location;

    this.category = $rootScope.currentCategory || 'all';
    let imageId = $routeParams.img;
    this.slides = $rootScope.images || imagesOrig;
    this.selected = this.slides.findIndex(slide => slide.id === imageId);

    if (this.selected < 0) this.location.path('/');
    
    this.checkUrl = this.checkUrl.bind(this, this.imageId);
    this.updateUrl = this.updateUrl.bind(this);

    $scope.$on('updateUrl', this.updateUrl);
  }

  checkUrl(imageId) {
    
  }

  updateUrl(event, args) {
    const id = GET_ID(this.slides, args.index);
    console.log("slides", id);
    // this.location.path(`/image/${id}`)
  }
}

PanelController.$inject = ['$rootScope', '$routeParams', '$scope', '$location'];
export default PanelController;
