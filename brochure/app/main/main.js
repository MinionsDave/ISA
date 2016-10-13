'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngPhotoswipe'
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/gallery');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('gallery', {
      url: '/gallery',
      templateUrl: 'main/templates/gallery.html',
      controller: 'GalleryCtrl as vm'
      // templateUrl: 'main/templates/<someTemplate>.html',
      // controller: 'SomeCtrl as ctrl'
    });
});
