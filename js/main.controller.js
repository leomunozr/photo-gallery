import camelCase from 'lodash/camelCase';
import differenceWith from 'lodash/differenceWith';
import imagesOrig from './images.json';
import take from 'lodash/take';
import startCase from 'lodash/startCase';
import uniq from 'lodash/uniq';

class MainController {
  constructor($uibModal, $scope) {
    this.$uibModal = $uibModal;
    this.$scope = $scope
    this.categorySelected = 'all';
    this.loading = false;
    this.limit = 13;
    this.images = [];
    this.categories = uniq(imagesOrig.map((img) => startCase(img.category)));

    this.loadImages(this.categorySelected, this.limit);
  }

  loadImages(filter, qty = 20) {
    if (this.loading) return;

    try {
    
      this.loading = true;
      let imgTemp = angular.copy(imagesOrig);
      filter = camelCase(filter);
      
      if (filter !== 'all') {
        imgTemp = imgTemp.filter((img) => img.category === filter);
        console.log('imgTemp', imgTemp)
      }

      imgTemp = take(imgTemp, qty);
      imgTemp = differenceWith(imgTemp, this.images, (img1, img2) => img1.src == img2.src);
      console.log("diff", imgTemp)
      let diff = imgTemp.concat(this.images);
      this.images = diff;
    }
    catch (e) { console.error(e); }
    finally { this.loading = false; }

  }

  filterImages(filter) {
    if (filter === this.categorySelected) return;
    this.images = [];
    this.loadImages(filter);
    this.categorySelected = startCase(filter);
  }
  
  showImage(imageSelected) {
    console.log(imageSelected)
    let modalInstance = this.$uibModal.open({
      ariaDescribedBy: 'modal-body',
      ariaLabelledBy: 'modal-title',
      controller: 'ImageModalController',
      controllerAs: 'imc',
      templateUrl: '../views/imageModal.html',
      size: 'lg',
      windowClass: '../views/imageModal.css',
      windowTemplateUrl: '/node_modules/angular-ui-bootstrap/template/modal/window.html',
      resolve: {
        imageSelected: () => imageSelected
      }
    });
  }

  loadMore() {
    console.log("loading more...")
    this.limit += 5
    this.loadImages(this.categorySelected, this.limit);
  }

}

MainController.$inject = ['$uibModal', '$scope'];
export default MainController;
