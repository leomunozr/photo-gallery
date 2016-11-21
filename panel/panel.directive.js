import controller from './panel.controller';
import linkFunction from './panel.link';

let templateUrl = './panel/panel.html'

let PanelComponent = ($rootScope) => {
  return {
    restrict: 'E',
    scope: {
      slides: '<',
      selected: '=',
      close: '&'
    },
    templateUrl,
    controller,
    controllerAs: 'vm',
    bindToController: true,
    link: linkFunction($rootScope)
  }
};

export default PanelComponent;
