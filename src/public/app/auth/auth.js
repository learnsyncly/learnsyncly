angular.module('lsync.auth', [])
  .controller('AuthController', function($scope, $state, $auth) {
    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.login = function() {
      $auth.login($scope.credentials)
        .then(function() {
          $location.path('/');
        })
        .catch(function(error) {
		console.log("error", error);
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $location.path('/');
        })
        .catch(function(error) {
          if (error.error) {
            // Popup error - invalid redirect_uri, pressed cancel button, etc.
            console.log("error");
          } else if (error.data) {
            // HTTP response error from server
            console.log("error");
          } else {
            console.log("error");
          }
        });
    };
    // $scope.login = function(provider) {
    //   $auth.authenticate(provider).then(function() {
    //     $state.go('main');
    //   });
    // };

    // $scope.register = function(credentials) {

    // };

    // $scope.logout = function() {
    //   Auth.logout();
    // };
  });
