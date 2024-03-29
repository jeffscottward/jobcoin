'use strict';

angular.module('jobcoin', 
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'nvd3ChartDirectives'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
        views: {
          'header': {
            templateUrl: 'partials/header.html',
            controller: 'HeaderCtrl'
          },
          'footer':{
            templateUrl: 'partials/footer.html'
          }
        }
      })
      .state('root.welcome', {
        url: '/',
        views: {
          'container@': {
            templateUrl: 'partials/welcome-panel.html',
            controller: 'WelcomeCtrl'
          }
        }
      })
      .state('root.loggedIn', {
        url: '/:jobcoinInputAddress',
        views: {
          'container@': {
            templateUrl: 'partials/logged-in.html'
          },
          'sendView@root.loggedIn': {
            templateUrl: 'partials/sending-interface.html',
            controller: 'SendingCtrl'
          },
          'chartView@root.loggedIn': {
            templateUrl: 'partials/chart.html',
            resolve: {
               promiseObj: function($rootScope, $http, $stateParams, addressService){
                  return addressService.getAddressData($stateParams.jobcoinInputAddress);
               }
            },
            controller: 'ChartCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  });
