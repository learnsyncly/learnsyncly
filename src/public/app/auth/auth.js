angular.module('lsync.auth', [])
  .controller('AuthController', function($scope, $auth) {
    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.login = function(provider) {
	$auth.authenticate(provider);
    };

    $scope.register = function(credentials) {

    };

    $scope.logout = function() {
      Auth.logout();
    };
  });
