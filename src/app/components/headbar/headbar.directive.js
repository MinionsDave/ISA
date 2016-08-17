'use strict';
angular.module('nodeInAction')
.directive('headbar', function () {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        controllerAs: 'vm',
        templateUrl: 'app/components/headbar/headbar.html',
        controller: function () {
            var vm = this;        
        }
    };
});