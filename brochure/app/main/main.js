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
      controller: 'GalleryCtrl as vm',
      resolve: {
        Products: function (Product, $q) {
          var d = $q.defer();
          Product.getAll()
          .success(function (products) {
            angular.forEach(products, function (val) {
              val.title = val.name + '<br>' + val.price;
            });
            d.resolve(products);
          });
          return d.promise;
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'main/templates/login.html',
      controller: 'LoginCtrl as vm'
    })
});
