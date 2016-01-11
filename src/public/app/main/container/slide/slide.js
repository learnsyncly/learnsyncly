//slideshow controller
angular.module('lsync.slide', [])
.controller('SlideController', function($scope, $sce, SlideState) {
  angular.extend($scope, SlideState);

  $scope.bumpSlide = function(){
    $scope.data.url = $scope.setSlide(Math.floor(Math.random() * 30));
  };


});
