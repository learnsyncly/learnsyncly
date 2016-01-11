//flyout controller
angular.module('lsync.flyout', [])
.controller('FlyoutController', function($scope, AppState) {
  angular.extend($scope, AppState);
  $scope.toggleFlyout = function(){
    $scope.flyout.status = !$scope.flyout.status;
  };
});
