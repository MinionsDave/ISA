'use strict';
angular.module('nodeInAction')
.controller('RegisterCtrl', function (Account, $state) {
    var vm = this;
    vm.user = {};
    vm.register = function (registerForm) {

        // 防止重复提交
        if (registerForm.$valid) {
            Account.register(vm.user)
            .then(function () {
                $state.go('account.confirmEmail', {email: vm.user.username});
            });
        }
    };
});