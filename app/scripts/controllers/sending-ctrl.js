'use strict'; // ES5+ JS

var app = angular.module('jobcoin'); // Application

////////////////////////
// CONTROLLER
////////////////////////

app.controller('SendingCtrl', // Controller
  ['$rootScope','$scope', '$state', 'addressService', 'coinService', '$stateParams', // Controller -- Dependencies
  function ($rootScope, $scope, $state, addressService, coinService, $stateParams)  { // Controller -- Namespaces

    // ////////////////////////
    // // SCOPE DATA & STATES
    // ////////////////////////

    $scope.jobcoinInputAddress = addressService.getAddress();

    $scope.jobcoinInputAmount   = 0;       // Coin Amount
    $scope.jobcoinOutputAddress = 'Cindy'; // Destination Address
    
    $scope.jobcoinInputAmountUI   = false;  // Field State
    $scope.jobcoinOutputAddressUI = false;  // Field State
    $scope.jobcoinInputAddress = addressService.address;
    
    // ////////////////////////
    // // SCOPE FUNCTIONS
    // ////////////////////////

    // Send coins with send button
    $scope.sendCoins = function(jobcoinInputAmount, jobcoinInputAddress, jobcoinOutputAddress){

      // Validate Coin Count  && Output Address
      if ( coinService.checkCointCount(jobcoinInputAmount)  && 
           addressService.checkAddress(jobcoinOutputAddress) ){
           
           // alert('Sending ' + jobcoinInputAmount + ' Jobcoins ' + 'from ' + jobcoinInputAddress + ' to ' + jobcoinOutputAddress);

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
    $scope.calculateMouseDistance = function(elem, mouseX, mouseY) {
      return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
    }

    // Mouse Proximity Feature Request
    $scope.mouseDetectionInit = (function(){

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

            distance  = $scope.calculateMouseDistance($element, mX, mY);
            distance2 = $scope.calculateMouseDistance($element2, mX, mY);

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
    })();

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
