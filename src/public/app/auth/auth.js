angular.module('lsync.auth', [])
  .controller('AuthController', function($scope, $auth, $rootScope, $window, $state) {
    var user = {
      name: $scope.name,
      email: $scope.email,
      password: $scope.password
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $window.localStorage.currentUser = JSON.stringify(response.data.user);
          $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          $state.go('main');
        })
        .catch(function(response) {
          console.log("response error", response);
        });
    };

    //$auth is the injection for satellizer
    $scope.login = function() {
      $auth.login(user)
        .then(function(response) {
          $window.localStorage.currentUser = JSON.stringify(response.data.user);
          $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          $state.go('main');
        })
        .catch(function(response) {
          console.log(response);
        });
    };

    $scope.signup = function() {

      $auth.signup(user)
        .then(function(response) {
          $location.path('/login');
        })
        .catch(function(response) {
          console.log(response.data);
        });

    };
  });
