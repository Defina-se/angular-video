angular.module('anguvideo.youtube', ['anguvideo.youtube.controller'])
  .component('youtubePlayer', {
    templateUrl : './components/youtube/component.html',
    controller : 'YoutubePlayerController',
    bindings : {
      url : '@'
    }
  })
