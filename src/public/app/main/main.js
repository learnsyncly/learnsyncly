//main controller
angular.module('lsync.main', [])
    .controller('MainController', function($scope,$rootScope, AppState) {
  angular.extend($scope, AppState);
  // This controller will hold the main app logic and can display slightly
  // different options depending on if it's in create or view mode.
  $scope.socket.connect();

  setInterval(function(){
    if($scope.checkTime()){
      console.log('checktime called');
      $scope.toggleSlideView();
      $scope.$apply();
    }
  }, 500);
});
