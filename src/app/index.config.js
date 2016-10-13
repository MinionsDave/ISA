(function() {
  'use strict';

  angular
    .module('nodeInAction')
    .config(config)
    .config(httpConfig)
    .config(datePickerConfig)
    .config(flowConfig)
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

          // 开发环境中使用
          if (rejection.status === 401) {
            var Account = $injector.get('Account');
            Account.login({
              username: 'll',
              password: '123456'
            });
          }

          return $q.reject(rejection);
        }
      };
    });
  }

  function datePickerConfig ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.months = $mdDateLocaleProvider.shortMonths = [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ];
    $mdDateLocaleProvider.days = $mdDateLocaleProvider.shortDays = [
      '周日',
      '周一',
      '周二',
      '周三',
      '周四',
      '周五',
      '周六'
    ];
    $mdDateLocaleProvider.firstDayOfWeek = 1;
    $mdDateLocaleProvider.formatDate = function(date) {
      return moment(date).format('YYYY-MM-DD');
    };
  }

  function flowConfig (flowFactoryProvider, Config) {
    flowFactoryProvider.defaults = {
      target: Config.URL + 'file/upload',
      testChunks: false
    };
  }

})();
