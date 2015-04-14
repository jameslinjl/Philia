(function () {
  'use strict';
  var controllers = angular.module('app.controllers');
  controllers.controller('UserGroupsCtrl', function($scope, AuthFactory,
    CurrentUser) {
      AuthFactory.login().then(function(result) {
        $scope.user = CurrentUser.user;
      });
    });
})();