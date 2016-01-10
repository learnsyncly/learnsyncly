//slideshow controller
angular.module('lsync.slide', [])
.controller('SlideController', function($scope, $sce, SlideState) {
  angular.extend($scope, SlideState);

  $scope.bumpSlide = function(){
    $scope.setSlide(Math.floor(Math.random() * 30));
  };


  //url updates using $sce.trustAsResourceUrl to composite url and slideNumber
  var updateUrl = function(){
    $scope.data.url = $sce.trustAsResourceUrl($scope.data.baseUrl + $scope.data.slideNumber);
    console.log('update URL fired');
  };
  //watch ensures the url updates when the slidenumber changes
  $scope.$watch('data.slideNumber', updateUrl);
});
