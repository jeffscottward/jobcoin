'use strict';

angular.module('jobcoin', 
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'nvd3ChartDirectives'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      });
      // .state('home.loggedIn', {
      //   url: '/:jobcoinInputAddress',
      //   templateUrl: 'partials/main.html',
      //   controller: function($scope, $stateParams) {
      //     $scope.jobcoinInputAddress = $stateParams.address;
      //   }
      // });

    $urlRouterProvider.otherwise('/');
  })
;
