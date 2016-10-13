'use strict';
angular.module('nodeInAction')
.directive('addDealerDialog', function ($mdDialog) {
    return {
        scope: {},
        link: function (scope, ele, attrs, ctrl) {
            ele.on('click', function () {
                $mdDialog.show({
                    templateUrl: 'app/components/addDealerDialog/addDealerDialog.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:true,
                    bindToController: true,
                    controllerAs: 'vm',
                    controller: function ($mdDialog, Account, toastr) {
                        var vm = this;
                        vm.cancel = function () {
                            $mdDialog.cancel();
                        };
                        vm.ok = function () {
                            Account.createChildAccount(vm.user)
                            .then(function () {
                                toastr.success('厂商创建成功');
                                $mdDialog.cancel();
                            });
                        };
                    }
                });
            });
        }
    };
});
