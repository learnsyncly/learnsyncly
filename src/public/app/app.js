angular.module('lsync', [
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('entry', {
      url: '/',
      templateUrl: '/app/entry.html',
      controller: 'EntryController'
    });
});
