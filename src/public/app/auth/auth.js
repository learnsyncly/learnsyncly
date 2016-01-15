angular.module('lsync.auth', [])
  .controller('AuthController', function($scope, $rootScope, $window, $state, Auth) {
    $scope.user = {};
    $rootScope.unread = $rootScope.unread || 0;

    if (Auth.isAuth()) {
      $rootScope.hasAuth = true;
    }

    $scope.login = function() {
      Auth.login($scope.user)
        .then(function(token) {
          $window.localStorage.setItem('com.lsyncly', token);
          $rootScope.hasAuth = true;
          $state.go('main');
        })
        .catch(function(error) {
          console.error(error);
        });
    };

    $scope.register = function() {
      Auth.register($scope.user)
        .then(function(token) {
          $window.localStorage.setItem('com.lsyncly', token);
          $rootScope.hasAuth = true;
          $state.go('main');
        })
        .catch(function(error) {
          console.error(error);
        });
    };
  });
