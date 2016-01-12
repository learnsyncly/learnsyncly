//video controller
angular.module('lsync.video', [])
.controller('VideoController', function($scope, VideoState) {
  angular.extend($scope, VideoState);
  $scope.init();
});
