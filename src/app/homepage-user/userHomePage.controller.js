'use strict';
angular.module('nodeInAction')
.controller('UserHomePageCtrl', function (Calendar) {
    var vm = this;
    
    vm.getOneMonth = function (date) {
        Calendar.getOneMonth(date).success(function (res) {
            vm.dates = res;
            vm.titleDate = res[26].date;
        });
    };

    vm.getNextMonth = function () {
        vm.getOneMonth(vm.dates[41].date + 24 * 3600 * 1000);
    };

    vm.getPreviewMonth = function () {
        vm.getOneMonth(vm.dates[0].date - 24 * 3600 * 1000);
    };

    vm.getOneMonth(new Date().getTime());
});