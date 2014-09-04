'use strict'; // ES5+ JS

// Address Functionality
app.service('addressService',
  ['$http', '$interval', 
  function ($http, $interval){ 

    this.address = undefined;
    this.mappedChartData = undefined;

    this.setAddress = function(address){
      this.address = address;
    };

    this.getAddress = function(){
      return this.address;
    };

    this.checkAddress = function(address){

      if( angular.isString(address) && address !== '' ){
        return true;
      } else{
        return false;
      }
    };

    this.getAddressData = function(address){
          
      // Get data
      return $http({
        method: 'GET',
        url: 'http://jobcoin.projecticeland.net/upspurt/api/addresses/' + address
      });
    };

  }]
);