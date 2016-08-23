'use strict';
angular.module('nodeInAction')
.filter('headPortrait', function (Config, $filter) {
    return function (val) {
        return $filter('host')(val) || 'assets/images/missing_face.png';
    };
});