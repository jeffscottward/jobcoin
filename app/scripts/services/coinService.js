'use strict'; // ES5+ JS

// Coin Functionality
app.service('coinService',['$http','$stateParams','$rootScope','addressService', function ($http,$stateParams,$rootScope,addressService){

  // Verify coin input
  this.checkCointCount = function(coins){

    if( angular.isNumber(coins) && coins > 0){
      return true;
    } else{
      return false;
    }  
  };

  // Ajax POST to API for new Transaction
  this.sendCoins = function(config){
    
    $http.post('http://jobcoin.projecticeland.net/upspurt/api/transactions', config)
         .success(function (data, status, headers, config){
            console.log('Sent Coins!');
            $rootScope.$broadcast('sentCoins', addressService.getAddressData($stateParams.jobcoinInputAddress));
         })
         .error(function(data,status,headers,config){
           alert(data.error);
         });
  }
}]);