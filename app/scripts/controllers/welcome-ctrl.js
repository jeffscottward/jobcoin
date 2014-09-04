'use strict'; // ES5+ JS

var app = angular.module('jobcoin'); // Application

////////////////////////
// CONTROLLER
////////////////////////

app.controller('WelcomeCtrl', // Controller
  ['$scope', 'addressService', '$state', '$rootScope', // Controller -- Dependencies
  function ($scope, addressService, $state, $rootScope)  { // Controller -- Namespaces
    
    ////////////////////////
    // SCOPE FUNCTIONS
    ////////////////////////

    // Sign In - UI Action
    $scope.signIn = function(jobcoinInputAddress){

        if( addressService.checkAddress(jobcoinInputAddress) ){
            addressService.setAddress(jobcoinInputAddress);
            $rootScope.$broadcast('someEvent', jobcoinInputAddress);
            $state.go('root.loggedIn', { jobcoinInputAddress: jobcoinInputAddress });
        } else {
            alert('Please enter a proper name');
        }
    };
  
}]);
