import camelCase from 'lodash/camelCase';
import differenceWith from 'lodash/differenceWith';
import imagesOrig from './images.json';
import startCase from 'lodash/startCase';
import uniq from 'lodash/uniq';

class MainController {
  constructor($scope) {
    this.$scope = $scope
    this.categorySelected = 'all';
    this.loading = false;
    this.images = [];
    this.categories = uniq(imagesOrig.map((img) => startCase(img.category)));

    this.loadImages(this.categorySelected);
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

  showImage(imageSelected) {
    console.log(imageSelected)
    this.imageSelected = imageSelected;
    this.showPanel = true;
  }

  hideImage() {
    console.log("delete")
    this.imageSelected = null;
    this.showPanel = false;
  }

  loadMore() {
    console.log("loading more...")
    this.loadImages(this.categorySelected);
  }

}

MainController.$inject = ['$scope'];
export default MainController;
