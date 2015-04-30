(function () {
  'use strict';
  var filters = angular.module('app.filters');

  filters.filter('filterByTrue', filterByTrue);

  function filterByTrue () {
    return function (activities) {
      console.log('getting called');
      var results = [];
      angular.forEach(activities, function (value, activity) {
        if (value) {
          console.log(results);
          results.push(activity);
        }
      });
      return results;
    };
  }
})();

