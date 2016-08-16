'use strict';
angular.module('nodeInAction')
.config(function ($stateProvider) {
    $stateProvider
    .state('homepage-user', {
        url: '/homepage-user',
        templateUrl: 'app/homepage-user/homepage-user.html'
    });
});
