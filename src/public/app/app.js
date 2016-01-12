//require statements are loaded via browserify
//if browserify doesn't support a file, load it with file path
//angular dependencies
require('angular');
require('angular-ui-router');
require('satellizer');
require('./auth/auth.js');
require('./create/create.js');
require('./main/main.js');
require('./main/slide/slide.js');
require('./main/video/video.js');
require('./main/flyout/flyout.js');
require('./main/toolbar/toolbar.js');
require('./services.js');

//other dependencies
require('../../../node_modules/socket.io-client/socket.io.js');

//LearnSyncly
angular.module('lsync', [
    'ui.router',
    'lsync.auth',
    'satellizer',
    'lsync.create',
    'lsync.main',
    'lsync.flyout',
    'lsync.slide',
    'lsync.video',
    'lsync.services',
    'lsync.toolbar'
  ])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {

    // function skipIfLoggedIn($q, $auth) {
    //   var deferred = $q.defer();
    //   if ($auth.isAuthenticated()) {
    //     deferred.reject();
    //   } else {
    //     deferred.resolve();
    //   }
    //   return deferred.promise;
    // }

    // function loginRequired($q, $location, $auth) {
    //   var deferred = $q.defer();
    //   if ($auth.isAuthenticated()) {
    //     deferred.resolve();
    //   } else {
    //     $location.path('/login');
    //   }
    //   return deferred.promise;
    // }

    $authProvider.github({
      url: '/auth/github',
      clientId: '2e8e4b8c6d51bd5a9622',
      redirectUri: window.location.origin
    });

    $authProvider.google({
      url: '/auth/google',
      clientId: '999928846531-1rgi7n93imidcduf6tunl2p847vjq6o5.apps.googleusercontent.com',
      redirectUri: window.location.origin
    });

    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('create', {
        url: '/create',
        templateUrl: 'app/create/create.html',
        controller: 'CreateController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/auth/login.html',
        controller: 'AuthController'
      })
      .state('main', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
          },
          'flyout@main': {
            templateUrl: 'app/main/flyout/flyout.html',
            controller: 'FlyoutController'
          },
          'toolbar@main': {
            templateUrl: 'app/main/toolbar/toolbar.html',
            controller: 'ToolbarController'
          },
          'slide@main': {
            templateUrl: 'app/main/slide/slide.html',
            controller: 'SlideController'
          },
          'video@main': {
            templateUrl: 'app/main/video/video.html',
            controller: 'VideoController'
          }
        }
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/auth/register.html',
        controller: 'AuthController'
      });
  });
