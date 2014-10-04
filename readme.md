# angular-input-date 1.0.4

This module provides a very simple directive to enable support for `input[type="date"]` with the latest stable version of AngularJS (`~1.2.26`).

With this, you can implement a simple HTML5 standard datepicker for AngularJS.

Look at the [Demo][demo].

*The latest stable version of AngularJS (`~1.2.26`) has no support for `input[type="date"]`.
The support was added only for `1.3` branch of Angular, which is now in beta.*

## Installation

### Install library with bower

`bower install --save angular-input-date`

### Add library to your page

``` html
<script type="text/javascript" src="angular-input-date/src/angular-input-date.js"></script>
```

### Add dependency in your application's module definition

``` javascript
var application = angular.module('application', [
    // ...
    'ngInputDate'
]);
```

## Usage

Just include the following HTML snippet to your page:

``` html
<input type="date" ng-model="myDateObject">
```

You can specify scope value in your controller like this:

``` javascript
application.controller('AppCtrl', function($scope) {
    $scope.myDateObject = new Date(2014, 3, 19);
});
```

Your date variable must be a proper [`Date`][mdn-date] object.
Read section *Detecting value changes* for more details on `Date` object requirements.

Here's the [Demo Example][demo] of how you can use this.

## Notes

### Detecting value changes

There are situations when you want to compare initial (master) value of the input
with the value provided by the user. In order for this to work correctly, you have
to provide initial `Date` object without a time part. We will call such dates *timeless*.

The thing is, that `input[type="date"]` HTML element is not designed to contain time information,
only a date. So when we pass your `Date` object to it, we have to truncate the time part.
And when a value is read from the input, the time part is already gone, so when you will try
to compare it against initial `Date` object, you will get a negative result.

You can create a timeless `Date` object the following way from scratch:
``` javascript
var year = 2014, month = 5, day = 25;
var dateWithoutTime = new Date(year, (month - 1), day);
```

Or if you want to convert existing `Date` object to timeless one, we provide a special
function to do so. Consider the following example:

``` javascript
application.controller('AppCtrl', function($scope, someExistingDate, inputDate) {
    $scope.entity = {
        date: inputDate.ExtractDate(someExistingDate)
    };
});
```

You have to inject our service called `inputDate` and invoke it's `ExtractDate` method.
It will return proper timeless `Date` object.

## Feedback

If you have found a bug - please create an issue in this GitHub repository.

If you have a question - file it with [StackOverflow][so-ask] and send me a
link to [s.fomin@betsol.ru][email].

Have any ideas or propositions? Feel free to contact me by the same [E-Mail address][email].

Cheers!

## License

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
[demo]: http://jsfiddle.net/slavafomin/F2LcY/4/
[so-ask]: http://stackoverflow.com/questions/ask?tags=angularjs,javascript
[email]: mailto:s.fomin@betsol.ru