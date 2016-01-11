//main controller
angular.module('lsync.main', [])
.controller('MainController', function($scope) {

  // This controller will hold the main app logic and can display slightly
  // different options depending on if it's in create or view mode.
  $state.go('main.container');
  $stat.go('video');
});
