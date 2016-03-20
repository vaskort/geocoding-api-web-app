(function(){
  var app = angular.module('app', ['app.locationservice', 'uiGmapgoogle-maps']);



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

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };


  });

  app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAw2pXZURI1WbXDpq99JhyQcr0va44Fyko',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
  });



})();
