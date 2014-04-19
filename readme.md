This AngularJS module provides very simple directive to enable support for `input[type="date"]`.

With this, you can implement a simple HTML5 standard datepicker for AngularJS.

Look at the [Demo][demo].

# Installation

## Install library with bower

`bower install --save angular-input-date`

## Add library to your page

``` html
<script type="text/javascript" src="angular-input-date/src/angular-input-date.js"></script>
```

## Add dependency in your application's module definition

``` javascript
var application = angular.module('application', [
    // ...
    'ngInputDate'
]);
```

# Usage

Just include the following HTML snippet to your page:

``` html
<input type="date" ng-model="myDateObject">
```

`date-model` attribute will tell directive the name of the scope variable you want to bind to.

You can specify scope value in your controller like this:

``` javascript
application.controller('AppCtrl', ['$scope', function($scope) {
        $scope.myDateObject = new Date(2014, 3, 19);
    }
]);
```

Your date variable must be a proper [`Date`][mdn-date] object.

Here's the [Demo Example][demo] of how you can use this.

# License

The MIT License (MIT)

Copyright (c) 2014 Slava Fomin II

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[mdn-date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[demo]: http://jsfiddle.net/F2LcY/2/