angular.module('anguvideo.vimeo', ['anguvideo.vimeo.controller'])
  .component('vimeoPlayer', {
    template : '<div class="anguvideo embed-responsive embed-responsive-16by9">' +
                    '<iframe id="playerVimeo" class="videoClass" type="text/html" ng-src="{{$ctrl.embedUrl | trusted}}" allowfullscreen frameborder="0"></iframe>' +
                  '</div>',
    controller : 'VimeoPlayerController',
    bindings : {
      url : '@'
    }
  })
