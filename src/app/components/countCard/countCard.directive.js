'use strict';
angular.module('nodeInAction')
.directive('countCard', function () {
    return {
        restrict: 'E',
        scope: {
            icon: '@',
            title: '@',
            count: '@',
            unit: '@',
            colorStyle: '@'
        },
        controllerAs: 'vm',
        templateUrl: 'app/components/countCard/countCard.html',
        controller: function () {
            // var vm = this;
        },
        bindToController: true
    };
});