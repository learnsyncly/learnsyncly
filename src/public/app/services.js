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
.factory('SlideshowState', function($rootScope){
  data = {};
  data.aspectRatio = 'aspect16-9';
  data.baseUrl = 'https://docs.google.com/presentation/d/1BrXgyVVKE02KvH8AcyHAs8KK-n1_mk3517uI5bXeOvw/embed?#slide=';
  data.slideNumber = 0;
  setInterval(function(){
    data.slideNumber ++;
    //factory uses $rootScope.$emit to prevent messages from traversing nested $scopes
    $rootScope.$emit('slideDataChange');
  },2000);
  return data;
});
