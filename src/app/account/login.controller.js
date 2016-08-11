'use strict';
angular.module('nodeInAction')
.controller('LoginCtrl', function (Account) {
    var vm = this;
    vm.user = {};
    vm.login = function (loginForm) {
        if (loginForm.$valid) {
            Account.login(vm.user)
            .then(function (res) {
                console.log(res);
            });
        }
    };
});