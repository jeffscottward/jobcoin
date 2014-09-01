'use strict'; // ES5+ JS

var app = angular.module('jobcoin'); // Application

////////////////////////
// CONTROLLER
////////////////////////

app.controller('MainCtrl', // Controller
  ['$scope', 'Restangular', 'addressService', 'coinService', '$http', '$state','$interval','$timeout', // Controller -- Dependencies
  function ($scope, Restangular, addressService, coinService, $http, $state, $interval, $timeout) { // Controller -- Namespaces

    ////////////////////////
    // SCOPE DATA & STATES
    ////////////////////////

    $scope.jobcoinInputAddress  = ''; // Origin Address
    $scope.jobcoinOutputAddress = 'Cindy'; // Destination Address
    
    $scope.jobcoinInputAmount   = 0;       // Coin Amount
    
    $scope.jobcoinInputAmountUI   = false;  // Field State
    $scope.jobcoinOutputAddressUI = false;  // Field State

    $scope.appState = 'welcome';            // App State
    $scope.chartData = [{
       "key": "Series 1",
       "values": [ [ 0 , 0] , [ 0 , 0] ] 
      }
    ];

    ////////////////////////
    // SCOPE FUNCTIONS
    ////////////////////////

    // Sign In - UI Action
    $scope.signIn = function(jobcoinInputAddress){

      // Validate Address 
      if ( addressService.checkAddress(jobcoinInputAddress) ){

        // Assign user and state
        $scope.jobcoinInputAddress = jobcoinInputAddress;
        $scope.appState = 'loggedIn';

        addressService.setAddress(jobcoinInputAddress);
        
        $scope.chartData = [
          {
              "key": "User Account Data",
              "values": addressService.mappedChartData
            }
         ];
        
        $interval(function(){
          $scope.chartData = [
          {
              "key": "User Account Data",
              "values": addressService.mappedChartData
            }
         ];   
        },1000);   

        $scope.mouseDetectionInit();

      } else {
        alert('Please enter a correct address');
      }
    };

    // Sign In - UI Action
    $scope.signOut = function(){
      $scope.appState = 'welcome';
      $scope.jobcoinInputAddress = '';
    };

    // Send Coins - UI Action
    $scope.sendCoins = function(jobcoinInputAmount, jobcoinInputAddress, jobcoinOutputAddress){

      // Validate Coin Count  && Output Address
      if ( coinService.checkCointCount(jobcoinInputAmount)  && 
           addressService.checkAddress(jobcoinOutputAddress) ){
           
           alert('Sending ' + jobcoinInputAmount + ' Jobcoins ' + 'from ' + jobcoinInputAddress + ' to ' + jobcoinOutputAddress);

           // Send coins
           coinService.sendCoins({
             fromAddress: jobcoinInputAddress,
             toAddress: jobcoinOutputAddress,
             amount: jobcoinInputAmount
           });

           // Reset fields on succesfully sending
           $scope.jobcoinInputAmountUI = false;
           $scope.jobcoinOutputAddressUI = false;

      } else {
           alert('Please enter a positive number of Jobcoins and a User');
      }
    };

    // Mouse Proximity algo
    function calculateMouseDistance(elem, mouseX, mouseY) {
      return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
    }

    // Mouse Proximity Feature Request
    $scope.mouseDetectionInit = function(){

      // Setup
      var mX, 
          mY, 
          distance,
          distance2,
          $element  = $('#jobcoinInputAmountText'), // Cache DOM obj
          $element2 = $('#jobcoinOutputAddressText'); // Cache DOM obj

        // On mouse movement
        $(document).mousemove(function(e) {  

            mX = e.pageX; // Get X position 
            mY = e.pageY; // Get Y position

            distance  = calculateMouseDistance($element, mX, mY);
            distance2 = calculateMouseDistance($element2, mX, mY);

            if(distance <= 30){
              $element.css({'border':'1px solid #4ab9db'});
            } else {
              $element.css({'border':'none'});
            }
            if(distance2 <= 30){
              $element2.css({'border':'1px solid #4ab9db'});
            } else {
              $element2.css({'border':'none'});
            }
        });
    };

    // Toggle Input Field - UI Action
    $scope.togglejobcoinUI = function(target){
      if(target === 'amount'){
        $scope.jobcoinInputAmountUI ? $scope.jobcoinInputAmountUI = false : $scope.jobcoinInputAmountUI = true;
      }
      if(target === 'address'){
        $scope.jobcoinOutputAddressUI ? $scope.jobcoinOutputAddressUI = false : $scope.jobcoinOutputAddressUI = true;
      }
    };
  
}]);
