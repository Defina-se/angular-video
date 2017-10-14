angular.module('anguvideo.vimeo', ['anguvideo.vimeo.controller'])
  .component('vimeoPlayer', {
    templateUrl : 'components/vimeo/component.html',
    controller : 'VimeoPlayerController',
    bindings : {
      url : '@'
    }
  })
