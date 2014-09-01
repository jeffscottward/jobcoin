'use strict'; // ES5+ JS

// Coin Functionality
app.service('coinService',['$http', function ($http){

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
            alert('Sent!');
         })
         .error(function(data,status,headers,config){
           alert(data.error);
         });
  }
}]);