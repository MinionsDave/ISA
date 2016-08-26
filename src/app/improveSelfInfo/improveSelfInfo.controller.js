'use strict';
angular.module('nodeInAction')
.controller('ImproveSelfInfoCtrl', function (Account, localStorageService) {
    var vm = this;
    vm.user = Account.getUser();
    if (vm.user.birthday) {
        vm.user.birthday = new Date(vm.user.birthday);
    }
    vm.ok = function (form) {
        if (!form.$valid) {
            return;
        }
        if (vm.flow.files.length > 0) {
            vm.flow.files.splice(0, vm.flow.files.length - 1);
            vm.flow.upload();
        } else {
            update();
        }
    };
    vm.uploadSuccessCallback = function ($file, $message) {
        vm.user.avatar = $message;
        update();
    };
    function update () {
        Account.updateUser(vm.user)
        .then(function () {
            localStorageService.set('user', vm.user);
        });
    }
});