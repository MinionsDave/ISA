'use strict';
angular.module('nodeInAction')
.controller('FactoryHomePageCtrl', function (Account, $filter, Products) {
    var vm = this;
    vm.products = Products;
    vm.opts = {
        index: 0,
        history: false
    };
    vm.showGallery = function (i) {
        if (angular.isDefined(i)) {
            vm.opts.index = i;
        }
        vm.open = true;
    };
    vm.closeGallery = function () {
        vm.open = false;
    };
    Account.getAllChildAccount()
    .success(function (dealers) {
        vm.dealers = dealers;
    });
});
