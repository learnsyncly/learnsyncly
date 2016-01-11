//require statements are loaded via browserify
//if browserify doesn't support a file, load it with file path
//angular dependencies
require('angular');
require('angular-ui-router');
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
    'lsync.create',
    'lsync.main',
    'lsync.flyout',
    'lsync.slide',
    'lsync.video',
    'lsync.services',
    'lsync.toolbar'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
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
