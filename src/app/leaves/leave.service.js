'use strict';
angular.module('nodeInAction')
.service('Leave', function ($http, Config) {
    this.add = function (leave) {
        return $http.post(Config.URL + '/leave', leave);
    };
});