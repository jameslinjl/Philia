(function () {
  'use strict';
  var controllers = angular.module('app.controllers');

  controllers.controller('UserDetailCtrl', function($scope, $stateParams,
    $firebaseObject, UsersFactory) {
    var userId = $stateParams.userId;
    $scope.user = UsersFactory.get(userId);
  });
})();