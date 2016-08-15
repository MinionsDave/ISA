'use strict';
angular.module('nodeInAction')
.controller('ForgetPswdCtrl', function (Account, toastr) {
    var vm = this;
    vm.ok = function (resetForm) {
        if (resetForm.$valid) {
            Account.sendResetEmail(vm.email)
            .then(function () {
                toastr.success('邮件已发送至' + vm.email);
            });
        }
    };
});