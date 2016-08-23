'use strict';
angular.module('nodeInAction')
.filter('host', function (Config) {
    return function (val) {
        if (!val) {
            return;
        }

        return Config.SERVER_URL + val;
    };
});