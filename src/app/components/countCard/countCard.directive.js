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
        bindToController: true,
        templateUrl: 'app/components/countCard/countCard.html',
        controller: function () {
            var vm = this;        
            console.log(vm);
        }
    };
});