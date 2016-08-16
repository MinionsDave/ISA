'use strict';
angular.module('nodeInAction')
.directive('leaveDaysCard', function () {
    return {
        restrict: 'E',
        scope: {},
        controllerAs: 'vm',
        templateUrl: 'app/components/leaveDaysCard/leaveDaysCard.html',
        controller: function () {
            var vm = this;         
        }
    };
});