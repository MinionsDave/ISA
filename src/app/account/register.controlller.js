'use strict';
angular.module('nodeInAction')
.controller('RegisterCtrl', function (Account, toastr) {
    var vm = this;
    vm.user = {};
    vm.register = function (registerForm) {

        // 防止重复提交
        if (registerForm.$valid) {
            Account.register(vm.user)
            .then(function (res) {
                toastr.success('马上激活！', '注册成功！');
            });
        }
    };
});