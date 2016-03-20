(function(){
  var app = angular.module('app', ['app.locationservice']);



  app.controller('LocationCtrl', function($scope, LocationService){
    LocationService.get().then(function(response){
      var locationProperty = response.results[0].geometry.location;
      // console.log(response);
      LocationService.getBusStops(locationProperty.lat, locationProperty.lng).then(function(response){
        console.log(response);
      });

    });
  })

})();
