'use strict';
angular.module('main')
.service('Product', function (Config, $http) {
    this.getAll = function (user) {
        return $http.get(Config.SERVER_URL + '/dealer/getAllProduct');
    };
});