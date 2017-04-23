import controller from './panel.controller';

let templateUrl = './panel/panel.html'

let PanelComponent = ($rootScope) => {
  return {
    restrict: 'E',
    templateUrl,
    controller,
    controllerAs: 'vm',
    bindToController: true
  }
};

export default PanelComponent;
