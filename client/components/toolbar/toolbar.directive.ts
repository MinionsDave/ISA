'use strict';

angular.module('isaAfApp')
  .directive('toolbar', function ($mdSidenav) {
    return {
      templateUrl: 'components/toolbar/toolbar.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.toggle = () => {
          $mdSidenav('left').toggle();
        };
      }
    };
  });
