(function () { 'use strict';
  var services = angular.module('app.services');

  services.factory('CurrentUser', function() {
    return {
      user: {},
      uid: {},
      loggedIn: false
    };
});
})();
