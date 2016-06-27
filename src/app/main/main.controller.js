(function() {
  'use strict';

  angular
    .module('isa')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($mdSidenav) {
    var vm = this;
    vm.toggle = function () {
      $mdSidenav('left').toggle();
    }
  }
})();
