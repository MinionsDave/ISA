'use strict';
angular.module('nodeInAction')
.config(function ($stateProvider) {
    $stateProvider
    .state('homepage-factory', {
        url: '/homepage-factory',
        templateUrl: 'app/homepage-factory/homepage-factory.html',
        controller: 'FactoryHomePageCtrl as vm',
        resolve: {
            Products: function (Account, $q, $filter) {
                var d = $q.defer();
                Account.getAllProduct()
                .success(function (products) {
                    angular.forEach(products, function (val) {
                        val.title = val.name + '<br>' + val.price;
                        val.src = $filter('headPortrait')(val.src);
                    });
                    d.resolve(products);
                });
                return d.promise;
            }
        }
    });
});
