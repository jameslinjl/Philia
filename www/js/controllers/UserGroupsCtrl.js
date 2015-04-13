(function () {
  'use strict';
  var controllers = angular.module('app.controllers');
  controllers.controller('UserGroupsCtrl', function($scope, UsersFactory,
    $stateParams, GroupsFactory, AuthFactory) {

    $scope.authObj = AuthFactory.getAuthObj();

      // var userObj = {};
      // console.log(Auth.login($scope.authObj));
      AuthFactory.login($scope.authObj).then(function(result) {
        var userId = result.facebook.id;
        console.log(userId);
        var user = UsersFactory.get(userId);
        AuthFactory.setUser(userId);
        user.$bindTo($scope, 'user');
      });
    });
})();