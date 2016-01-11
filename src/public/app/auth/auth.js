angular.module('lsync.auth', [])
  .controller('AuthController', function($scope, Auth) {
    $scope.login = function(user) {
      Auth.login(user);
      //reset values in form
      $scope.user.username = '';
      $scope.user.password = '';
    };

    $scope.register = function(user) {
      Auth.register(user);
      //reset values in form
      $scope.user.username = '';
      $scope.user.password = '';
    };

    $scope.logout = function() {
      Auth.logout();
    };
  });
