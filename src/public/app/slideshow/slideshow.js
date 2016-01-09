//slideshow controller
angular.module('lsync.slideshow', [])
.controller('SlideshowController', function($scope, $rootScope, SlideshowState, $sce) {
  $scope.data = SlideshowState;
  console.log($scope);
  var updateSlideShow = function() {
    $scope.data.fullUrl = $sce.trustAsResourceUrl($scope.data.baseUrl + $scope.data.slideNumber);
    $scope.$apply();
  };
  $scope.data.fullUrl = $sce.trustAsResourceUrl($scope.data.baseUrl + $scope.data.slideNumber);

  //$rootScope.on allows messaging between factory and view
  //useful if our controller needs signaling from a factory
  //factory uses $rootScope.$emit to prevent messages from traversing nested $scopes
  $rootScope.$on('slideDataChange', updateSlideShow);
});
