'use strict';
angular.module('main')
.service('User', function (Config, $http) {
    this.login = function (user) {
        return $http.post(Config.SERVER_URL + '/login', user);
    };
});