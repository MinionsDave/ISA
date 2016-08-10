'use strict';
angular.module('nodeInAction')
.directive('pwCheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {

            ctrl.$validators.pwCheck = function (val) {
                return val === scope.registerForm.password.$modelValue;
            };
        }
    };
});