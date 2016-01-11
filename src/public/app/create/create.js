//create controller
angular.module('lsync.create', [])
  .controller('CreateController', function($scope, $http, AppState) {
    $scope.slide = {};
    $scope.slide.userUrl = '';
    $scope.slide.badUrl = false;
    $scope.slide.restrictedUrl = false;
    $scope.slide.urlValidated = false;
    var validUserUrl = '';



    $scope.submitForm = function(){



    };







    //a slideshow 200's when its good, 302's when unauthorized and 404's when its bad
    //below is for testing

    //authorized (public) slideshow (200 status code via ajax request)
    //id = '1BrXgyVVKE02KvH8AcyHAs8KK-n1_mk3517uI5bXeOvw';

    //unauthorized (not public) slideshow (302 status code via ajax request)
    //id = '1ry9LD-Z9Q88iajAMwQoAFzrzRYoR9qxj3Oa83h64_GY';

    //not a real slideshow (404 status code via ajax request)
    //id = '1ry9LD-Z9Q88iajAMwQoAFzrz3459835982383h64_GY';


    //utility functions
    var validateSlideUrl = function(){
      $http({
        method: 'GET',
        url: $scope.slide.userUrl
      }).then(function successCallback(res) {
        if(res.status === 200){
          //reset url vars since url is valid
          $scope.slide.restrictedUrl = false;
          $scope.slide.badUrl = false;
          //next run check for proper id fragment
          parseSlideUrl();
        } else if (res.status === 302) {
          //302 means the slideshow isn't public or the url
          //redirects and isn't a google slideshow
          $scope.slide.restrictedUrl = true;
          $scope.slide.badUrl = true;
        } else {
          //404's and everything else are bad urls
          $scope.slide.badUrl = true;
        }
      }, function errorCallback(res) {
        $scope.slide.badUrl = true;
      });
    };

    var parseSlideUrl = function(){
      //$scope.slide.userUrl;
      //regex for /presentation/d/
      var presentation = /\/presentation\/d\//;
    };
  });
