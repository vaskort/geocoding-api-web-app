(function(){
  var app = angular.module('app', ['app.locationservice', 'uiGmapgoogle-maps']);



  app.controller('LocationCtrl', function($scope, LocationService, uiGmapIsReady, $timeout){

    // was going to use this so I can show the map when the search is done but was too much with the toggle
    $scope.mapClass = 'active';

    // default value for how to show markers (cluster, spider, none)
    $scope.clusterVal = 'none';

    // default value for input
    $scope.locationVal = 'earls';

    // empty the markers array so we dont have errors at the map init
    $scope.markers = [];

    $scope.findLocation = function() {

      // this hides the search box
      $scope.toggledClass = true;
      // and refresh the map
      $scope.refreshMap();

      // erase the old markers array
      $scope.markers = [];

      // make the http request
      LocationService.get($scope.locationVal).then(function(response){
        var locationProperty = response.results[0].geometry.location;

        // make the request to take the lat and long from bus stops
        LocationService.getBusStops(locationProperty.lat, locationProperty.lng).then(function(response){
          // add stops to scope
          $scope.busStationsArray = response.stops;

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

    // init options of the map
    $scope.map = {
      center: {
        latitude: 51.532580,
        longitude: -0.135965
      },
      zoom: 11,
      refresh: function () {
        $scope.map.control.refresh(center);
      }
    };

    // onclick scope function for markers
    $scope.onClick = function(marker, eventName, model) {
      $scope.hideMarkers();
      // and show the clicked one
      model.show = true;
    };

    $scope.hideMarkers = function(){
      // remove the shown markers
      for (var i = 0; i < $scope.markers.length; i++){
        $scope.markers[i].show = false;
      }
    };

    // hide/show the input container
    $scope.toggleInput = function(){
      $scope.toggledClass = !$scope.toggledClass;
      // we need to refresh the map after the transition of it to make it bigger or else a part of it will be grey
      $scope.refreshMap();
    };

    // refreshMap is used when toggling the search box
    $scope.refreshMap = function(){
      uiGmapIsReady.promise().then(function (maps) {
        // timeout is needed because of the css transition
        $timeout(function() {
          google.maps.event.trigger(maps[0].map, 'resize');
        }, 500);
      });
    };




  });

  // angular google map init http://angular-ui.github.io/angular-google-maps/#!/use
  app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAw2pXZURI1WbXDpq99JhyQcr0va44Fyko',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  });



})();
