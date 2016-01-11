//toolbar controller
angular.module('lsync.toolbar', [])
.controller('ToolbarController', function($scope, AppState) {
  angular.extend($scope, AppState);
});
