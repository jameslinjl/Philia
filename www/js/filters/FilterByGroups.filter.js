(function () {
  'use strict';
  var filters = angular.module('app.filters');

  filters.filter('filterByGroups', filterByGroups);

  function filterByGroups (CurrentUser, UsersFactory) {
    return function (users, groups) {
      console.log(users);
      console.log(groups);
      var results = [];
      angular.forEach(users, function (user) {
        if (user.uid !== CurrentUser.uid) {
          if (groups.some(function (group) {
            return user[group];
          })) {
            results.push(user);
          }
        }
      });
      return results;
    };
  }
})();



