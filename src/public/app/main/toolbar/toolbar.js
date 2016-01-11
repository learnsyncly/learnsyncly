//toolbar controller
angular.module('lsync.toolbar', [])
.controller('ToolbarController', function($scope, AppState) {
  angular.extend($scope, AppState);
  $scope.toggleFlyout = function(){
    $scope.flyout.status = !$scope.flyout.status;
  };
});
