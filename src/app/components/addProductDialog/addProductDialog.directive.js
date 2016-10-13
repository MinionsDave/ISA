'use strict';
angular.module('nodeInAction')
.directive('addProductDialog', function ($mdDialog) {
    return {
        scope: {},
        link: function (scope, ele, attrs, ctrl) {
            ele.on('click', function () {
                $mdDialog.show({
                    templateUrl: 'app/components/addProductDialog/addProductDialog.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:true,
                    bindToController: true,
                    controllerAs: 'vm',
                    controller: function ($mdDialog, Account, toastr) {
                        var vm = this;
                        vm.product = {};
                        vm.uploadSuccessCallback = function ($file, $message) {
                            vm.product.src = $message;
                            update();
                        };
                        function update () {
                            Account.uploadProduct(vm.product)
                            .then(function () {
                                 toastr.success('上传产品成功');
                                 vm.cancel();
                            });
                        }
                        vm.cancel = function () {
                            $mdDialog.cancel();
                        };
                        vm.ok = function () {
                            if (vm.flow.files.length > 0) {
                                vm.flow.files.splice(0, vm.flow.files.length - 1);
                                vm.flow.upload();
                            } else {
                                update();
                            }
                        };
                    }
                });
            });
        }
    }
})
