'use strict';
angular.module('nodeInAction')
.controller('ImproveSelfInfoCtrl', function (Account, localStorageService) {
    var vm = this;
    vm.user = Account.getUser();
    vm.update = function (form) {
        if (!form.$valid) {
            return;
        }
        Account.updateUser(vm.user)
        .then(function (res) {
            console.log(res);
            localStorageService.set('user', vm.user);
        });
    };
});