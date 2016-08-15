'use strict';
angular.module('nodeInAction')
.config(function ($stateProvider) {
	$stateProvider
	.state('account', {
		url: '/account',
		abstract: true,
		templateUrl: 'app/account/account.html'
	})
	.state('account.login', {
		url: '/login/:activeToken',
		templateUrl: 'app/account/login.html',
		controller: 'LoginCtrl as vm'
	})
	.state('account.register', {
		url: '/register',
		templateUrl: 'app/account/register.html',
		controller: 'RegisterCtrl as vm'
	})
	.state('account.confirmEmail', {
		url: '/confirmEmail/:email',
		templateUrl: 'app/account/confirmEmail.html',
		controller: 'ConfirmEmailCtrl as vm'
	})
	.state('account.forgetPswd', {
		url: '/forgetPswd',
		templateUrl: 'app/account/forgetPswd.html',
		controller: 'ForgetPswdCtrl as vm'
	})
	.state('account.improvement', {
		url: '/improvement',
		templateUrl: 'app/account/improvement.html'
	})
	.state('account.resetPswd', {
		url: '/resetPswd/:activeToken/:username',
		templateUrl: 'app/account/resetPswd.html',
		controller: 'ResetPswdCtrl as vm'
	})
});
