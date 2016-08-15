'use strict';
angular.module('nodeInAction')
.controller('ResetPswdCtrl', function (Account, $stateParams, $state, toastr) {
    var vm = this;
    vm.username = $stateParams.username;
    vm.reset = function (resetForm) {

        if (resetForm.$valid) {
            Account.resetPswd(vm.username, vm.password, $stateParams.activeToken)
            .then(function (res) {
                toastr.success('<b><a href="/#/account/login/">立即登录</a></b>', '密码重置成功！');
            }, function () {
                toastr.error('您的重置密码信息有误');
            });
        }
    };
});