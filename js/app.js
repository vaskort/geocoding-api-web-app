(function(){
  var app = angular.module('app', ['app.locationservice', 'uiGmapgoogle-maps']);



  app.controller('LocationCtrl', function($scope, LocationService){

    // default value for how to show markers (cluster, spider, none)
    $scope.clusterVal = 'none';

    // default value for input
    $scope.locationVal = 'earls';

    // empty the markers array so we dont have errors at the map init
    $scope.markers = [];

    $scope.findLocation = function() {


      // erase the old markers array
      $scope.markers = [];
      LocationService.get($scope.locationVal).then(function(response){
        var locationProperty = response.results[0].geometry.location;
        // console.log(response);
        LocationService.getBusStops(locationProperty.lat, locationProperty.lng).then(function(response){

          $scope.busStationsArray = response.stops;
          console.log(response);
          for (var i = 0; i < $scope.busStationsArray.length; i++){

            $scope.markers.push({
                 id:i,
                 latitude: $scope.busStationsArray[i].latitude,
                 longitude: $scope.busStationsArray[i].longitude,
                 content: $scope.busStationsArray[i].name,
                 show:false
             });
          }
        });
      });
    }

    $scope.map = {
      center: {
        latitude: 51.532580,
        longitude: -0.135965
      },
      zoom: 11
    };

    $scope.onClick = function(marker, eventName, model) {
        $scope.hideMarkers();
        // and show the clicked one
        model.show = true;
    };

    $scope.hideMarkers = function(model){
      // remove the shown markers
      for (var i = 0; i < $scope.markers.length; i++){
        $scope.markers[i].show = false;
      }
    }


  });

  app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAw2pXZURI1WbXDpq99JhyQcr0va44Fyko',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
  });



})();
