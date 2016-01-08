angular.module('lsync.services', [])
.factory('AppState', function(){
  //store app state data here
})
.factory('UserState', function(){
  //store video state data here
})
.factory('VideoState', function(){
  //store video state data here
  video = {};
  video.url = '';
  video.currentTime = 0;

  video.updateCurrentTime = function(){
    return video.video.currentTime;
  };

  return video;
})
.factory('SlideshowState', function(){
  //store slideshow state data here
});
