(function() {
  'use strict';

  angular
    .module('nodeInAction')
    .config(config)
    .config(httpConfig)
    .config(function ($mdThemingProvider) {
      $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('light-blue')
      .warnPalette('red');
    });

  /** @ngInject */
  function config($logProvider, toastrConfig, localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('nodeInAction');

    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = false;
  }

  function httpConfig ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $injector) {
      return {
        responseError: function (rejection) {
          if (rejection.status === 401) {
            var Account = $injector.get('Account');
            Account.login({
              username: '651882883@qq.com',
              password: '123456'
            });
          }
           return $q.reject(rejection);
        }
      };
    });
  }

})();
