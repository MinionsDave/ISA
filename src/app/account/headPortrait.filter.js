'use strict';
angular.module('nodeInAction')
.filter('headPortrait', function ($filter, Config) {
    return function (val) {
        return $filter('host')(val) || Config.HEAD_PORTRAIT_DEFAULT;
    };
});