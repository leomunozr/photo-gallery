import camelCase from 'lodash/camelCase';
import differenceWith from 'lodash/differenceWith';
import imagesOrig from '../js/images.json';

class GalleryController {
  constructor($rootScope, $routeParams) {
    this.images = [];
    this.categorySelected = $routeParams.category || 'all';
    this.loading = false;

    this.loadImages(this.categorySelected);

    $rootScope.currentCategory = this.categorySelected;
    $rootScope.images = this.images;
  }

  loadImages(filter) {
    if (this.loading) return;

    try {

      this.loading = true;
      filter = camelCase(filter);
      let imgTemp = angular.copy(imagesOrig);
      imgTemp = differenceWith(imgTemp, this.images, (img1, img2) => img1.src === img2.src);
      imgTemp = imgTemp.concat(this.images);

      if (filter !== 'all') {
        imgTemp = imgTemp.filter((img) => img.category === filter);
      }

      this.images = imgTemp;
    }
    catch (e) { console.error(e); }
    finally { this.loading = false; }

  }

  filterImages(filter) {
    this.hideImage();
    if (filter === this.categorySelected) return;
    this.loadImages(filter);
    this.categorySelected = startCase(filter);
  }
}

GalleryController.$inject = ['$rootScope', '$routeParams'];
export default GalleryController;