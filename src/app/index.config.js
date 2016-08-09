(function() {
  'use strict';

  angular
    .module('nodeInAction')
    .config(config)
    // .config(function ($mdThemingProvider) {
    //   $mdThemingProvider.theme('default')
    //   .primaryPalette('009688');
    // });

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
