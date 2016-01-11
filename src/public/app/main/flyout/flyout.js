//flyout controller
angular.module('lsync.flyout', [])
.controller('FlyoutController', function($scope, AppState) {
  angular.extend($scope, AppState);
});
