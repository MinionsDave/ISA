'use strict';
angular.module('nodeInAction')
.controller('UserHomePageCtrl', function (Account) {
    var vm = this;
    Account.getAllFactory()
    .success(function (users) {
         vm.users = users;
    });
});
