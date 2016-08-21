'use strict';
angular.module('nodeInAction')
.controller('ImproveSelfInfoCtrl', function (Account) {
    var vm = this;
    vm.user = Account.getUser();
    vm.update = function (form) {
        if (!form.$valid) {
            return;
        }
        Account.updateUser(vm.user)
        .then(function (res) {
            console.log(res);
        });
    };
});