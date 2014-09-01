'use strict'; // ES5+ JS

// Address Functionality
app.service('addressService',['$http', '$interval', function ($http,$interval){ 

  // Top level reference
  var self = this;

  // Data variables
  this.address = undefined;
  this.mappedChartData = undefined;

  this.setAddress = function(address){
    this.address = address;

    // Start data retreival and graph building
    this.getAddressData(address);

    // Poll the REST API
    $interval(function(){
      self.getAddressData(address);
    }, 1000);
  };

  this.getAddress = function(){
    return this.address;
  };

  this.checkAddress = function(address){

    // Form field checking
    // This could be much more robust
    if( angular.isString(address) && address !== '' ){
      return true;
    } else{
      return false;
    }
  };

  this.getAddressData = function(address){
        
    // Get data
    $http({
      method: 'GET',
      url: 'http://jobcoin.projecticeland.net/upspurt/api/addresses/' + this.address
    }).success(function (data, status, headers, config){

      // Start Graph building
      self.buildBalanceTimeline(data);
    });  
  };

  this.buildBalanceTimeline = function(data) {

    // Data stores
    var balanceTimeline = [];
    var timeStampTimeline = [];
    
    // Parse JSON
    var myData = angular.fromJson(data);

    // 
    var nowBalance = 0;
    var transactions = myData.transactions;
    
    // Build data for graph    
    for(var i = 0; i <= transactions.length-1; i++){

      // Subtract if the transaction is
      // from the current user to someone else
      if( transactions[i].fromAddress && 
          transactions[i].fromAddress === this.address) {
            nowBalance = parseInt(nowBalance) - parseInt(transactions[i].amount);
            balanceTimeline.push(nowBalance);            
      } else if (
          // add for the opposite or
          // if its the genisis balance 
          transactions[i].fromAddress && 
          transactions[i].fromAddress !== this.address ||
          transactions[i].fromAddress === undefined ) {
            nowBalance = parseInt(nowBalance) + parseInt(transactions[i].amount);
            balanceTimeline.push(nowBalance);
      } 

      // Push timeline increment
      
      // NVD3 won't play nice with these even after formatting
      // in setMappedData, would require more digging
      // timeStampTimeline.push(transactions[i]['timestamp']);  
      timeStampTimeline.push(i); // Lets use a simple increment instead
    };

    // Format data correctly for ingestion of graph
    this.setMappedData({
      balance: balanceTimeline,
      timestamp: timeStampTimeline
    });
  
  };

  this.setMappedData = function (obj){
    
    // Break out the data points
    var balance = obj.balance; 
    var timestamp = obj.timestamp;

    // Format the dates
    // NVD3 can chart against string
    // var newTimesFormat = _.map(timestamp, function(d){
    //   return d3.time.format('%b-%d-%X')(new Date(d)); 
    // //   return d;
    // });

    // Map them together for charting
    this.mappedChartData = _.zip(timestamp, obj.balance);
  }


}]);