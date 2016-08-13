'use strict';
angular.module('nodeInAction')
.controller('ConfirmEmailCtrl', function ($stateParams, toastr, Account) {
    var vm = this;
    vm.user = {};
    vm.email = $stateParams.email;
    vm.sendAgain = function () {
        Account.sendAgain(vm.email)
        .then(function () {
            toastr.success('邮件已发送至' + vm.email);
        });
    };
});