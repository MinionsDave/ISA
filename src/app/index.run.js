(function() {
  'use strict';

  angular
    .module('nodeInAction')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
