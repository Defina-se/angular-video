/**
 * Created by Mariandi on 11/03/2014.
 */
/*global angular*/
'use strict';

angular.module('anguvideo', ['anguvideo.vimeo', 'anguvideo.youtube', 'anguvideo.azure'])
    .directive("anguvideo", ['$interval', '$compile', function ($interval, $compile) {
        return {
            restrict: 'EA',
            scope: {
                source: '=ngModel',
                width: '@',
                height: '@',
								autoPlay: '@',
                url: '@'
            },
            replace: true,
            link: function(scope, element, attrs) {
              var render = function(html) {
                var childElement = $compile(html)(scope);
                element.append(childElement);
              }

              if (scope.url.indexOf('vimeo') >= 0) {
                render('<div><vimeo-player url="{{url}}"></vimeo-player></div>')
              } else if (scope.url.indexOf('youtu.be') >= 0 || scope.url.indexOf("youtube.com") >= 0) {
                render('<div><youtube-player url="{{url}}"></youtube-player></div>')
              } else if (scope.url.indexOf('windows') >= 0) {
                render('<div><azure-media-player url="{{url}}"></azure-media-player></div>')
              } else {
                throw 'could not determine the right template for ' + scope.url
              }
            }
        };
    }]);
