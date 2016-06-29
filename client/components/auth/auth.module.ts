'use strict';

angular.module('isaAfApp.auth', [
  'isaAfApp.constants',
  'isaAfApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
