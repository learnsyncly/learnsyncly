angular.module('lsync.authentication', [])
  .controller('AuthController', function($scope, AuthenticationFactory) {
    $scope.login = function(user) {
      AuthenticationFactory.login(user);
      //reset values in form
      $scope.user.username = '';
      $scope.user.password = '';
    };

    $scope.register = function(user) {
      AuthenticationFactory.register(user);
      //reset values in form
      $scope.user.username = '';
      $scope.user.password = '';
    };

    $scope.logout = function() {
      AuthenticationFactory.logout();
    };
  });
