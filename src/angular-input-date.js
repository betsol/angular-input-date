(function(window, angular) {
    'use strict';

    var inputDateFormat = 'yyyy-MM-dd';

    angular.module('ngInputDate', ['ng'])
        .directive('input', ['dateFilter', function(dateFilter) {
            return {
                restrict: 'E',
                require: '?ngModel',
                priority: 1,
                link: function(scope, element, attrs, ngModel) {
                    if (
                           'undefined' !== typeof attrs.type
                        && 'date' === attrs.type
                        && ngModel
                    ) {
                        ngModel.$render = function() {
                            element.val(
                                dateFilter(ngModel.$viewValue, inputDateFormat)
                            );
                        };
                    }
                }
            }
        }])
    ;

})(window, angular);