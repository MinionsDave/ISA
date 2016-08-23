'use strict';
angular.module('nodeInAction')
.directive('headbar', function () {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        controllerAs: 'vm',
        templateUrl: 'app/components/headbar/headbar.html',
        controller: function (Account) {
            var vm = this;
            vm.user = Account.getUser();
        }
    };
});