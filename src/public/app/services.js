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

    return {};
  })
  .factory('SlideState', function($rootScope, $sce) {
    //initial properties
    var slide = {};

    //methods accessable from SlideState
    slide.setSlide = function(number) {
      slide.data.slideNumber = number;
      console.log(slide.data.slideNumber);
      return $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
    };

    slide.buildBaseUrl = function(resourceId){
      return 'https://docs.google.com/presentation/d/' + resourceId + '/embed?#slide=';
    };

    //data object to help namespace scope when extended on controller
    slide.data = {};
    slide.data.aspectRatio = 'aspect16-9';
    //authorized (public) slideshow (200 status code via ajax request)
    slide.data.identifier = '1BrXgyVVKE02KvH8AcyHAs8KK-n1_mk3517uI5bXeOvw';
    //unauthorized (not public) slideshow (302 status code via ajax request)
    //slide.data.identifier = '1ry9LD-Z9Q88iajAMwQoAFzrzRYoR9qxj3Oa83h64_GY';
    //not a real slideshow (404 status code via ajax request)
    //slide.data.identifier = '1ry9LD-Z9Q88iajAMwQoAFzrz3459835982383h64_GY';

    slide.data.baseUrl = slide.buildBaseUrl(slide.data.identifier);
    slide.data.slideNumber = 0;
    slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);



    return slide;
  });
