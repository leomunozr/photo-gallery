import imagesOrig from './images.json';
import startCase from 'lodash/startCase';
import uniq from 'lodash/uniq';

class MainController {
  constructor($scope) {
    this.$scope = $scope;
    this.categories = uniq(imagesOrig.map((img) => startCase(img.category)));
  }
}

MainController.$inject = ['$scope'];
export default MainController;
