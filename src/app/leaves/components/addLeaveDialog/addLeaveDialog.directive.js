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
                    clickOutsideToClose:true
                });
            });
        }
    }
})