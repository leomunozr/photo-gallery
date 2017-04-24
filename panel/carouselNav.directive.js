let carouselNavDirective = ($document, $rootScope, $location) => {
  return {
    restrict: 'A',
    link: (scope, elem, attr) => {
      
      $document.on('keydown', (ev) => {
        let key = ev.keyCode || ev.which;
      
      switch (key) {
        // esc
        case 27:
          console.log("esc");
          scope.$apply(() => { $location.path('/') });
          break;
        // izq
        case 37:
          //  Eventos recibidos en node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js
          $rootScope.$broadcast("prev");
          break;
        // der
        case 39:
          $rootScope.$broadcast("next");
          break;
      }
      })

      // Remove key events  
      scope.$on('$destroy', () => {
        console.log("Event destroyed");
        $document.off('keydown');
      })
    }
  }
}

export default carouselNavDirective;