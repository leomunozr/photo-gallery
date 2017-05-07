import controller from './panel.controller';
import link from './panel.link';

let templateUrl = './panel/panel.html'

let panelDirective = ($document, $rootScope, $location) => {
  return {
    restrict: 'E',
    templateUrl,
    controller,
    controllerAs: 'vm',
    bindToController: true,
    link: link($document, $rootScope, $location)
  }
};

export default panelDirective;
