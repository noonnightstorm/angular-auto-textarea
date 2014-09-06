(function () {
  'use strict';

  angular.module('ui.autotextarea',[])
  .directive('autoTextarea', [
    function() {
      return {
        restrict: 'AE',
        scope: {
          width : '=width',
          height : '=height',
          maxHeight : '=maxHeight',
          onkeydown : '&onKeydown'
        },
        controller : ['$scope',function($scope){
        }],
        link: function(scope, element, attrs) {
          var _box = $(element).find('.auto-textarea');
          var _textarea = $(element).find('textarea');
          var _div = $(element).find('.textarea-div');

          //初始化样式
          _box.css({
            'position' : 'relative'
          });
          _div.css({
            'visibility' : 'hidden',
            'min-height' : (scope.height || 100) + 'px',
            'width' : (scope.width || 100) + 'px',
            'white-space' : 'pre-wrap',
            'word-wrap' : 'break-word',
            'word-break' : 'break-all',
            //一定要保证div和textarea的字体一样,padding,margin都要一样
            'font-size': '14px'
          });
          _textarea.css({
            'position' : 'absolute',
            'width' : (scope.width || 100) + 'px',
            'height' : (scope.height || 100) + 'px',
            'resize' : 'none',
            'overflow' : 'hidden'
          });
          if(scope.maxHeight){
            _textarea.css('min-height',scope.maxHeight + 'px');
          }

          function _resize(){
            //获取textarea的内容，并把换行符替换为br标签
            var _text = _textarea.val();
            //(因为单独一行只有br标签的话浏览器是不会换行的，所以要加上z字符)
            _text = _text.replace(/\n/g, '<br>') + "z";
            //把内容复制进隐藏的div里面
            _div.html(_text);

            //将div自适应的高赋值给textarea
            var _height = _div.height();
            _textarea.height(_height);
          }

          scope.inputKeyDown = function(){
            _resize();
            scope.onkeydown();
          };
        },
        template : [
          '<div class="auto-textarea">',
            '<textarea ng-keydown="inputKeyDown()"></textarea>',
            '<div class="textarea-div"></div>',
          '</div>'
        ].join("")
      };
    }
  ]);
})();