'use strict';
angular.module('nodeInAction')
.config(function ($stateProvider) {
    $stateProvider
    .state('improveSelfInfo', {
        url: '/improveSelfInfo',
        templateUrl: 'app/improveSelfInfo/improveSelfInfo.html',
        // controller: 'UserHomePageCtrl as vm'
    });
});
