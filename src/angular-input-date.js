(function(window, angular) {
    'use strict';

    var inputDateFormat = 'yyyy-MM-dd';

    /**
     * Converts string representation of date to a Date object.
     * @param dateString
     * @returns {Date|null}
     */
    function parseDateString(dateString) {
        var parts = dateString.split('-');
        if (3 !== parts.length) {
            return null;
        }
        var year = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var day = parseInt(parts[2], 10);

        if (month < 1 || year < 1 || day < 1) {
            return null;
        }

        return new Date(year, (month - 1), day);
    }

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

                        element.on('change', function() {
                            scope.$apply(function() {
                                var dateString = element.val();
                                ngModel.$setViewValue(parseDateString(dateString));
                            });
                        });
                    }
                }
            }
        }])
    ;

})(window, angular);