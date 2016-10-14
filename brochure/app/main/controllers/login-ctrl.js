'use strict';
angular.module('main')
.controller('LoginCtrl', function (User, $state) {
    var vm = this;
    vm.user = {};
    vm.login = function () {
        User.login(vm.user)
        .success(function () {
            $state.go('gallery');
        });
    };
});
