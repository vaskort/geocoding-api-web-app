angular.module('app.locationservice', [])
  .factory('LocationService', function($http){

    var apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    var apiKey = 'AIzaSyBAuYHaY4KqFCvKcQg-7cwdPEmgkr_lk5E';
    var location = 'Athens';

    return {

      get: function(){
        return $http.get(apiUrl + location + '&key=' + apiKey).then(function(response) {
          return response;
        });
      }

    }


  });
