angular.module('app.locationservice', [])
  .factory('LocationService', function($http){

    var apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    var apiKey = 'AIzaSyBAuYHaY4KqFCvKcQg-7cwdPEmgkr_lk5E';
    var components= 'components=administrative_area:London|country:GB'; //made the request london specific
    // uk transport vars
    var transportApiKeyAndId = 'api_key=d9307fd91b0247c607e098d5effedc97&app_id=03bf8009';
    var transportApiUrl = 'http://transportapi.com/v3/uk/bus/stops/near.json?';

    return {

      get: function(location){
        return $http.get(apiUrl + location + '&' + components + '&key=' + apiKey).then(function(response) {
          return response.data;
        });
      },

      getBusStops: function(lat, lon){
        return $http.get(transportApiUrl + 'lat=' + lat + '&lon=' + lon + '&' + transportApiKeyAndId).then(function(response) {
          return response.data;
        });
      }
    }


  });
