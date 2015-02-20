(function(window, angular) {
    'use strict';

    var inputDateFormat = 'yyyy-MM-dd';

    /**
     * Converts string representation of date to a Date object.
     *
     * @param dateString
     * @returns {Date|null}
     */
    function parseDateString(dateString) {
        if ('undefined' === typeof dateString || '' === dateString) {
            return null;
        }

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

    /**
     * Converts DateTime object to Date object.
     *
     * I.e. truncates time part.
     * @param dateTime
     * @constructor
     */
    function ExtractDate(dateTime) {
        return new Date(
            dateTime.getUTCFullYear(),
            dateTime.getUTCMonth(),
            dateTime.getUTCDate()
        );
    }


    /**
     * Valide selected date is between range     *
     * I.e. truncates time part.
     * @param selectedDate,minLimit,maxLimit
     * @constructor
     */
    function validationRange(selectedDate,minLimit, maxLimit){
        var dateToCompare = selectedDate;
        if(!(selectedDate instanceof Date) && angular.isDefined(selectedDate)){
            dateToCompare = new Date(selectedDate);
        }
        var minLimitError = (angular.isDefined(minLimit) && dateToCompare < minLimit);
        var maxLimitError = (angular.isDefined(maxLimit) && dateToCompare > maxLimit);
        if(!dateToCompare || minLimitError || maxLimitError){
            return false;
        }
        return true;
    }

    angular.module('ngInputDate', ['ng'])
        .factory('inputDate', function() {
            return {
                ExtractDate: ExtractDate
            };
        })
        .directive('dateOptions',function(){

            return {
                restrict: 'A',
                scope:{
                    minLimit: '=',
                    maxLimit: '='
                },
                require: '?ngModel',
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$setValidity('required',!( angular.isUndefinedOrNullOrEmpty(ngModel.$modelValue)) );

                    ngModel.$formatters.push(function(modelValue) {
                        ngModel.$setValidity('required',!( angular.isUndefinedOrNullOrEmpty(ngModel.$viewValue)) );
                        ngModel.$setValidity('range', validationRange(modelValue, scope.minLimit, scope.maxLimit));
                        return modelValue;
                    });
                    ngModel.$parsers.push(function(viewValue) {
                        ngModel.$setValidity('required',!(angular.isUndefinedOrNullOrEmpty(ngModel.$viewValue)) );
                        ngModel.$setValidity('range', validationRange(viewValue, scope.minLimit, scope.maxLimit));
                        return viewValue;
                    });

                }
            };
        })
        .directive('input', ['dateFilter','inputDate', function(dateFilter, inputDate) {
            return {
                restrict: 'E',
                require: '?ngModel',
                link: function(scope, element, attrs, ngModel) {
                    if (angular.isUndefined(attrs.type) ||
                        'date' !== attrs.type || !ngModel || !inputDate.enabled) {
                        return;
                    }
                    ngModel.$formatters.push(function(modelValue) {
                        return dateFilter(modelValue, inputDateFormat);
                    });

                    ngModel.$parsers.push(function(viewValue) {
                        return parseDateString(viewValue);
                    });
                }
            };
        }]) ;

})(window, angular);
