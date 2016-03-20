(function(){
  var app = angular.module('app', ['app.locationservice', 'uiGmapgoogle-maps']);



  app.controller('LocationCtrl', function($scope, LocationService){
    $scope.markers = [];

    $scope.findLocation = function() {
      LocationService.get($scope.locationVal).then(function(response){
        var locationProperty = response.results[0].geometry.location;
        // console.log(response);
        LocationService.getBusStops(locationProperty.lat, locationProperty.lng).then(function(response){

          console.log($scope.locationVal);
          $scope.busStationsArray = response.stops;
          console.log($scope.busStationsArray.length);
          for (var i = 0; i < $scope.busStationsArray.length; i++){

            $scope.markers.push({
                 id:i,
                 latitude: $scope.busStationsArray[i].latitude,
                 longitude: $scope.busStationsArray[i].longitude
             });
          }
          console.log($scope.markers);
        });
      });
    }

    $scope.map = {
      center: {
        latitude: 51.532580,
        longitude: -0.135965
      },
      zoom: 8
    };


  });

  app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAw2pXZURI1WbXDpq99JhyQcr0va44Fyko',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
  });



})();
