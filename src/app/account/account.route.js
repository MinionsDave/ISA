'use strict';
angular.module('nodeInAction')
.config(function ($stateProvider) {
	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl: 'app/account/login.html',
		controllerAs: 'vm',
		controller: function ($http) {
			var vm = this;
			vm.login = function () {
				$http.post('http://localhost:1994/login', vm.user)
				.then(function (res) {
					console.log(res);
				});
			};
			vm.query = function () {
				$http.get('http://localhost:1994/account')
				.then(function (res) {
					console.log(res);
				})
			}
		}
	})
});
