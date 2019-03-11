import imagesOrig from './images.json';
import startCase from 'lodash/startCase';
import uniq from 'lodash/uniq';

class MainController {
  constructor($scope, $rootScope) {
    this.$scope = $scope;
    this.categories = uniq(imagesOrig.map((img) => startCase(img.category)));
    this.$rootScope = $rootScope;

    this.$scope.$on('newCategory', (ev, { category }) => {
      this.categorySelected = category;
    });
  }
}

MainController.$inject = ['$scope', '$rootScope'];
export default MainController;
