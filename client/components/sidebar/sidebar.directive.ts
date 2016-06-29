'use strict';

angular.module('isaAfApp')
  .directive('sidebar', function () {
    return {
      templateUrl: 'components/sidebar/sidebar.html',
      restrict: 'EA',
      // link: function (scope, element) {
      //   console.log(1);
      // }
    };
  });
