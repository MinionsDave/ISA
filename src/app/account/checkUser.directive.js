'use strict';
angular.module('nodeInAction')
.directive('checkUser', function (Account) {
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {
            ctrl.$asyncValidators.checkUser = function (val) {  
                return Account.checkUser(val);
            };
        }
    };
});