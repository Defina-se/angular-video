angular.module('anguvideo.youtube', ['anguvideo.youtube.controller'])
  .component('youtubePlayer', {
    template : '<div class="anguvideo embed-responsive embed-responsive-16by9">' +
                    '<iframe id="playerYV" class="videoClass" type="text/html" ng-src="{{$ctrl.embedUrl | trusted}}" allowfullscreen frameborder="0"></iframe>' +
                  '</div>',
    controller : 'YoutubePlayerController',
    bindings : {
      url : '@'
    }
  })
