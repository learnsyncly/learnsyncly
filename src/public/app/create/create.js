//create controller
angular.module('lsync.create', [])
  .controller('CreateController', function($scope, $http, AppState) {
    //slide specific variables
    $scope.slide = {};
    $scope.slide.userUrl = '';
    $scope.slide.badUrl = false;
    $scope.slide.restrictedUrl = false;
    $scope.slide.urlValidated = false;
    $scope.slide.validId = '';

    $scope.submitForm = function(){
      //TODO send form data somewhere
      console.log($scope.createForm);
    };

    //parsing the users url ensures we have a valid id for the slideshow which means we
    //can display the slideshow regardless of whether the user gave us an embeddabled url
    $scope.parseSlideUrl = function(){
      var chopUrl = $scope.slide.userUrl;
      //make sure url came from google and is a slideshow from drive
      if(chopUrl === undefined || chopUrl.indexOf('google.com') === -1 || chopUrl.indexOf('/presentation/d/') === -1){
        $scope.slide.badUrl = true;
        $scope.slide.urlValidated = false;
        return;
      }
      //chop up the url
      var firstSlice = chopUrl.indexOf('/presentation/d/') + '/presentation/d/'.length;
      chopUrl = chopUrl.slice(firstSlice);
      var secondSlice = chopUrl.indexOf('/');
      chopUrl = chopUrl.slice(0,secondSlice);
      //validate via ajax
      validateSlideUrl(chopUrl);
    };

    //utility functions:

    //gets a url string using url fragment and then validates the full url via ajax
    //a slideshow 200's when its good, 302's when unauthorized and 404's when its bad
    var validateSlideUrl = function(urlFragment){
      var url = AppState.slide.buildBaseUrl(urlFragment);
      $http({
        method: 'GET',
        url: $scope.slide.userUrl
      }).then(function successCallback(res) {
        if(res.status === 200){
          $scope.slide.urlValidated = true;
          $scope.slide.validId = urlFragment;
          //reset url vars since url is valid in case the user changes input
          $scope.slide.restrictedUrl = false;
          $scope.slide.badUrl = false;
        } else if (res.status === 302) {
          //302 means the slideshow isn't public or the url
          //redirects and isn't a google slideshow
          $scope.slide.restrictedUrl = true;
          $scope.slide.badUrl = true;
          $scope.slide.urlValidated = false;
        } else {
          //404's and everything else are bad urls
          $scope.slide.badUrl = true;
          $scope.slide.urlValidated = false;
        }
      }, function errorCallback(res) {
        $scope.slide.badUrl = true;
      });
    };
  });
