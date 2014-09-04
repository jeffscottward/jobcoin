'use strict'; // ES5+ JS

var app = angular.module('jobcoin'); // Application

////////////////////////
// CONTROLLER
////////////////////////

app.controller('WelcomeCtrl', // Controller
  ['$scope', 'addressService', '$state', // Controller -- Dependencies
  function ($scope, addressService, $state)  { // Controller -- Namespaces

    ////////////////////////
    // SCOPE DATA & STATES
    ////////////////////////
    
    if($state.params.jobcoinInputAddress !== undefined){
        addressService.address = $stateParams.jobcoinInputAddress;
        $scope.jobcoinInputAddress = $state.params.jobcoinInputAddress;
    }
    
    ////////////////////////
    // SCOPE FUNCTIONS
    ////////////////////////

    // Sign In - UI Action
    $scope.signIn = function(jobcoinInputAddress){

      // Validate Address 
      if ( addressService.checkAddress(jobcoinInputAddress) ){

        // Assign user and state
        addressService.address = jobcoinInputAddress;
        $scope.jobcoinInputAddress = jobcoinInputAddress;
        $state.go('root.loggedIn', { jobcoinInputAddress: jobcoinInputAddress });
      }
    };

    // Sign Out - UI Action
    $scope.signOut = function(){

      $scope.jobcoinInputAddress = '';
      $state.go('root.welcome', { jobcoinInputAddress: '' });
    };
  
}]);
