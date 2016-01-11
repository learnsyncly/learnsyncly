angular.module('lsync.services', [])
  .factory('AppState', function(Auth, SlideState, VideoState, UserState) {
    appState = {};
    appState.slide = SlideState;
    appState.video = VideoState;
    appState.user = UserState;
    //store app state data here
    return appState;
  })
  .factory('Auth', function() {
    //store video state data here
    return {};
  })
  .factory('UserState', function() {
    //store video state data here
    return {};
  })
  .factory('VideoState', function($rootScope) {
    var video={};

    video.data={};
    video.data.currentTime=0;
    return video;
  })
  .factory('SlideState', function($rootScope, $sce, $http) {
    //initial properties
    var slide = {};

    //data object to help namespace scope when extended on controller
    slide.data = {};
    slide.data.aspectRatio = 'aspect16-9';
    slide.data.identifier = '1BrXgyVVKE02KvH8AcyHAs8KK-n1_mk3517uI5bXeOvw';
    slide.data.identifier = '1BrXgyVVKE02KvH8AcyHAs8KK-n1_mk3517uI5bXeOvw';
    slide.data.baseUrl = 'https://docs.google.com/presentation/d/' + slide.data.identifier + '/embed?#slide=';
    slide.data.slideNumber = 0;
    slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);

    $http({
      method: 'GET',
      url: slide.data.baseUrl
    }).then(function successCallback(response) {
      console.log('good resource');
    }, function errorCallback(response) {
      console.log('bad resource');
    });

    //methods accessable from SlideState
    slide.setSlide = function(number) {
      slide.data.slideNumber = number;
      console.log(slide.data.slideNumber);
      return $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
    };

    return slide;
  });
