angular.module('app.locationservice', [])
  .factory('LocationService', function($http){

    var apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    var apiKey = 'AIzaSyBAuYHaY4KqFCvKcQg-7cwdPEmgkr_lk5E';
    var components= 'components=administrative_area:London|country:GB'; //made the request london specific
    var location = 'waterloo';

    return {

      get: function(){
        return $http.get(apiUrl + location + '&' + components + '&key=' + apiKey).then(function(response) {
          return response.data;
        });
      }

    }


  });
