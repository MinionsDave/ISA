'use strict';
angular.module('nodeInAction')
.directive('checkUserExists', function (Account, $q) {
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {
            var d = $q.defer();
            ctrl.$asyncValidators.checkUserExists = function (val) {  

                // 这是验证用户是否还未注册的接口，所以要反一下
                Account.checkUser(val)
                .then(function () {
                    d.reject();
                }, function () {
                    d.resolve();
                });

                return d.promise;
            };
        }
    };
});