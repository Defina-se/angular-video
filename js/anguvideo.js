/**
 * Created by Mariandi on 11/03/2014.
 */
/*global angular*/
'use strict';

angular.module('anguvideo', ['anguvideo.vimeo', 'anguvideo.youtube', 'anguvideo.azure'])
    .directive("anguvideo", ['$sce', '$interval', function ($sce, $interval) {
        return {
            restrict: 'EA',
            scope: {
                source: '=ngModel',
                width: '@',
                height: '@',
								autoPlay: '@'
            },
            replace: true,
            template: function(element, attrs) {
              if (attrs.url.indexOf('vimeo') >= 0) {
                return '<div><vimeo-player url="' + attrs.url + '"></vimeo-player></div>'
              } else if (attrs.url.indexOf('youtu.be') >= 0 || attrs.url.indexOf("youtube.com") >= 0) {
                return '<div><youtube-player url="' + attrs.url + '"></youtube-player></div>'
              } else if (attrs.url.indexOf('windows') >= 0) {
                return '<div><azure-media-player url="' + attrs.url + '"></azure-media-player></div>'
              } else {
                throw 'could not determine the right template for ' + attrs.url
              }
            }
        };
    }]);
