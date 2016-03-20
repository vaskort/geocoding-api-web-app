(function(){
  var app = angular.module('app', ['app.locationservice']);

  app.controller('LocationCtrl', function($scope, LocationService){
    LocationService.get().then(function(response){
      console.log(response);
    });
  })

})();
