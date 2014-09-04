'use strict'; // ES5+ JS

var app = angular.module('jobcoin'); // Application

////////////////////////
// CONTROLLER
////////////////////////

app.controller('LoginCtrl', // Controller
  ['$scope', '$rootScope', 'addressService', '$state', '$stateParams',// Controller -- Dependencies
  function ($scope, $rootScope, addressService, $state, $stateParams)  { // Controller -- Namespaces

    ////////////////////////
    // SCOPE DATA & STATES
    ////////////////////////

    // $rootScope.$on("inputAddrChange", function(obj){
    //     console.dir(obj.address);
    //     $scope.jobcoinInputAddress = obj.address;
    // });

    $scope.setAddr = function(address){
        
        // If there is a state param
        if($state.params.jobcoinInputAddress !== undefined){
            $scope.jobcoinInputAddress = $state.params.jobcoinInputAddress;
            // console.log('$state.params.jobcoinInputAddress: ' + $state.params.jobcoinInputAddress);
            // console.log('$scope.jobcoinInputAddress: ' + $scope.jobcoinInputAddress);
        } else { // If there is NO state param
            $scope.jobcoinInputAddress = address;
            // console.log('$state.params.jobcoinInputAddress: ' + $state.params.jobcoinInputAddress);
            // console.log('$scope.jobcoinInputAddress: ' + $scope.jobcoinInputAddress);
        }
    }

    $scope.setAddr();
    
    ////////////////////////
    // SCOPE FUNCTIONS
    ////////////////////////

    // Sign In - UI Action
    $scope.signIn = function(jobcoinInputAddress){

        if( addressService.checkAddress(jobcoinInputAddress) ){
            $scope.jobcoinInputAddress = jobcoinInputAddress;
            // $rootScope.$emit('inputAddrChange',{ address: jobcoinInputAddress });
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
