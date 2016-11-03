import controller from './panel.controller';

let templateUrl = './panel/panel.html'

let PanelComponent = {
  restrict: 'E',
  bindings: {
    slides: '<',
    selected: '=',
    close: '&'
  },
  templateUrl,
  styleUrls: ['./panel/panel.css'],
  controller,
  controllerAs: 'vm'
}

export default PanelComponent;
