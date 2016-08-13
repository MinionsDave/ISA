'use strict';
angular.module('nodeInAction')
.service('Account', function ($http, Config) {
    this.register = function (user) {
        return $http.post(Config.URL + 'account', user);
    };

    this.checkUser = function (email) {
        return $http.get(Config.URL + 'account/checkUser/' + email);
    };

    this.login = function (user) {
        return $http.post(Config.URL + 'login', user);
    };

    this.sendAgain = function (email) {
        return $http.get(Config.URL + 'account/sendAgain/' + email);  
    };

    this.activeUser = function (activeToken) {
        return $http.get(Config.URL + 'account/active/' + activeToken);
    };
});
