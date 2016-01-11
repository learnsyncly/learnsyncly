//slideshow controller
angular.module('lsync.slide', [])
.controller('SlideController', function($scope, $sce, SlideState) {
  angular.extend($scope, SlideState);
  $scope.init();
});
