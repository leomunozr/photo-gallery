let linkFunction = (rootScope) => {
  return (scope, element, attrs, ctrl) => {

    element.on('keydown', (ev) => {
      let key = ev.keyCode || ev.which;

      switch (key) {
        // esc
        case 27:
          scope.$apply(ctrl.close());
          break;
        // izq
        case 37:
          rootScope.$broadcast("previo");
          break;
        // der
        case 39:
          rootScope.$broadcast("siguiente");
          break;
      }
    });
  }
}

export default linkFunction;