(function() {
  'use strict';

  angular
    .module('nodeInAction')
    .config(config)
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

})();
