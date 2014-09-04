'use strict'; // ES5+ JS

var app = angular.module('jobcoin'); // Application

////////////////////////
// CONTROLLER
////////////////////////

app.controller('HeaderCtrl', // Controller
  ['$scope', '$rootScope', 'addressService', '$state', '$stateParams', // Controller -- Dependencies
  function ($scope, $rootScope, addressService, $state, $stateParams)  { // Controller -- Namespaces

    ////////////////////////
    // SCOPE DATA & STATES
    ////////////////////////

    $rootScope.$on("loginEvent", function(event, obj){
        $scope.jobcoinInputAddress = obj;
    });

    $scope.setAddr = function(address){
        
        // If there is a state param
        if($state.params.jobcoinInputAddress !== undefined){
            $scope.jobcoinInputAddress = $state.params.jobcoinInputAddress;
            addressService.setAddress($state.params.jobcoinInputAddress);
        } else { // If there is NO state param
            $scope.jobcoinInputAddress = address;
        }
    }

    $scope.setAddr();
    
    ////////////////////////
    // SCOPE FUNCTIONS
    ////////////////////////

    // Sign In - UI Action
    $scope.signIn = function(jobcoinInputAddress){

        if( addressService.checkAddress(jobcoinInputAddress) ){
            addressService.setAddress(jobcoinInputAddress);
            $scope.jobcoinInputAddress = jobcoinInputAddress;
            $state.go('root.loggedIn', { jobcoinInputAddress: jobcoinInputAddress });
        } else {
            alert('Please enter a proper name');
        }
    };

    // Sign Out - UI Action
    $scope.signOut = function(){

      $scope.jobcoinInputAddress = '';
      $state.go('root.welcome', { jobcoinInputAddress: '' });
    };
  
}]);
