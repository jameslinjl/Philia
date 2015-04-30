(function () {
  'use strict';
  var controllers = angular.module('app.controllers');

  controllers.controller('OtherProfileCtrl', function($scope, $stateParams,
    $firebaseObject, UsersFactory) {
    var userId = $stateParams.userId;
    $scope.groupId = $stateParams.groupName;

    console.log(userId);
    $scope.user = UsersFactory.get(userId);
  });
})();