angular.module('lsync.services', [])
.factory('AppState', function(SlideState, VideoState, UserState){
  appState = {};
  appState.slide = SlideState;
  appState.video = VideoState;
  appState.user = UserState;
  //store app state data here
  return appState;
})
.factory('UserState', function(){
  //store video state data here
  return {};
})
.factory('VideoState', function($rootScope){

  return {};
})
.factory('SlideState', function($rootScope, $sce){
  //initial properties
  var slide = {};

  //data object to help namespace scope when extended on controller
  slide.data = {};
  slide.data.aspectRatio = 'aspect16-9';
  slide.data.baseUrl = 'https://docs.google.com/presentation/d/1BrXgyVVKE02KvH8AcyHAs8KK-n1_mk3517uI5bXeOvw/embed?#slide=';
  slide.data.slideNumber = 0;
  slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);

  //methods accessable from SlideState
  slide.setSlide = function(number){
    slide.data.slideNumber = number;
    console.log(slide.data.slideNumber);
  };

  return slide;
});
