'use strict';
angular.module('nodeInAction')
.controller('RegisterCtrl', function (Account) {
    var vm = this;
    vm.user = {};
    vm.register = function (registerForm) {
        if (registerForm.$valid) {
            Account.register(vm.user)
            .then(function (res) {
                console.log(res);
            }, function (res) {
                console.log(res);
            });
        }
    };
});