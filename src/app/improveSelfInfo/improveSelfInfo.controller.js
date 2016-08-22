'use strict';
angular.module('nodeInAction')
.controller('ImproveSelfInfoCtrl', function (Account, localStorageService) {
    var vm = this;
    vm.user = Account.getUser();
    if (vm.user.birthday) {
        vm.user.birthday = new Date(vm.user.birthday);
    }
    vm.update = function (form) {
        if (!form.$valid) {
            return;
        }
        Account.updateUser(vm.user)
        .then(function (res) {
            localStorageService.set('user', vm.user);
        });
    };
});