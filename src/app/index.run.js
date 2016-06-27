(function() {
  'use strict';

  angular
    .module('isa')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
