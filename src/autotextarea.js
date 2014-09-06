(function () {
  'use strict';

  angular.module('ui.autotextarea')
  .directive('autoTextarea', [
    function() {
      return {
        restrict: 'AE',
        scope: {

        },
        controller : ["$scope",function($scope){
			
		    }],
        link: function(scope, element, attrs) {
          console.log(element);
        }
      };
    }
  ]);
})();