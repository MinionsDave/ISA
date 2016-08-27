'use strict';
angular.module('nodeInAction')
.filter('host', function (Config) {
    return function (val) {
        if (!val) {
            return;
        }

        // 去除没用的public前缀
        if (val && val.indexOf('public') === 0) {
            return Config.SERVER_URL + val.substr(6);
        }

        return Config.SERVER_URL + val;
    };
});