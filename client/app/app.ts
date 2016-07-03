
'use strict';

angular.module('isaAfApp', [
  'isaAfApp.auth',
  'isaAfApp.admin',
  'isaAfApp.constants',
  'ngCookies',
  'ngResource',
  'ngMessages',
  'ngSanitize',
  'ui.router',
  'validation.match',
  'ngMaterial'
])
  .config(function($urlRouterProvider, $locationProvider) {
      $urlRouterProvider
        .otherwise('/');

      $locationProvider.html5Mode(true);
  })
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  });
  // .config(function ($mdThemingProvider) {
  //   $mdThemingProvider
  //     .theme('default')
  //     .backgroundPalette('orange');
  // });
