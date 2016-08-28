'use strict';
angular.module('nodeInAction')
.directive('addLeaveDialog', function ($mdDialog) {
    return {
        scope: {},
        link: function (scope, ele, attrs, ctrl) {
            ele.on('click', function () {
                $mdDialog.show({
                    templateUrl: 'app/leaves/components/addLeaveDialog/addLeaveDialog.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:true,
                    bindToController: true,
                    controllerAs: 'vm',
                    controller: function ($mdDialog, Account, Leave) {
                        var vm = this;
                        vm.cancel = function () {
                            $mdDialog.cancel();
                        };
                        vm.leave = {
                            userId: Account.getUser()._id
                        };
                        vm.addLeave = function () {
                            Leave.add(vm.leave)
                            .then(function () {
                                alert('chenggong');
                            }, function () {
                                alert('shibai');
                            });
                        };
                    }
                });
            });
        }
    }
})