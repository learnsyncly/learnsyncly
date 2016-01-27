//slideshow controller
angular.module('lsync.slide', [])
.controller('SlideController', function($scope, $sce, SlideState) {
  angular.extend($scope, SlideState);
  $scope.init();
})
.factory('SlideState', function($rootScope, $sce) {
    //initial properties
    var slide = {};

    //data object to help namespace scope when extended on controller
    slide.data = {};

    //test data... TODO:remove later
    slide.data.aspectRatio = 'aspect16-9';
    slide.data.length = 13;
    slide.data.identifier = '1pprD-zp6VBa6nBvRKsPvTiAPMFs67oUmHeqV88DOauw';

    //methods accessable from SlideState
    slide.setSlide = function(number) {
      if (number > slide.data.length) {
        return false;
      }
      slide.data.slideNumber = number;
      slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
      return true;
    };

    slide.next = function() {
      if (slide.data.slideNumber + 1 > slide.data.length) {
        return false;
      }
      slide.data.slideNumber++;
      slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
      return true;
    };

    slide.prev = function() {
      if (slide.data.slideNumber - 1 < 0) {
        return false;
      }
      slide.data.slideNumber--;
      slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
      return true;
    };

    slide.buildBaseUrl = function(resourceId) {
      return 'https://docs.google.com/presentation/d/' + resourceId + '/embed?#slide=';
    };

    slide.init = function() {
      //initial settings on setup
      slide.data.baseUrl = slide.buildBaseUrl(slide.data.identifier);
      slide.data.slideNumber = 1;
      slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
    };

    return slide;
  });
