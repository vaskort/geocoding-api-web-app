(function(){
  var app = angular.module('app', ['app.locationservice']);



  app.controller('LocationCtrl', function($scope, LocationService){

      $scope.findLocation = function() {
        LocationService.get($scope.locationVal).then(function(response){
          var locationProperty = response.results[0].geometry.location;
          // console.log(response);
          LocationService.getBusStops(locationProperty.lat, locationProperty.lng).then(function(response){
            console.log(response);
            console.log($scope.locationVal)
          });
        });
      }
    });
})();
