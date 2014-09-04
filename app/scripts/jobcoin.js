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
            controller: 'LoginCtrl'
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
            controller: 'LoginCtrl'
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
            templateUrl: 'partials/line-chart.html',
            resolve: {
               promiseObj: function($rootScope, $http, $stateParams, addressService){
                  return $http({
                    method: 'GET',
                    url: 'http://jobcoin.projecticeland.net/upspurt/api/addresses/' + $stateParams.jobcoinInputAddress
                  });
               }        
            },
            controller: 'ChartCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  });
