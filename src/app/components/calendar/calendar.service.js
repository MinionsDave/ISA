'use strict';
angular.module('nodeInAction')
.service('Calendar', function ($http, Config) {
    this.getOneMonth = function (date) {
        return $http.get(Config.URL + 'calendar/' + date);
    };
});