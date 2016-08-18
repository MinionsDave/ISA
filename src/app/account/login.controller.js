'use strict';
angular.module('nodeInAction')
.controller('LoginCtrl', function (Account, $stateParams, toastr, localStorageService, $state) {
    var vm = this;
    vm.user = {};
    vm.login = function (loginForm) {
        if (loginForm.$valid) {
            Account.login(vm.user)
            .then(function (res) {
                localStorageService.set('user', res.data);
                $state.go('homepage-user');
            });
        }
    };
    
    if ($stateParams.activeToken) {
        Account.activeUser($stateParams.activeToken)
        .then(function () {
            toastr.success('邮箱激活成功!');
        });
    }
});