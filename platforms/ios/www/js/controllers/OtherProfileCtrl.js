(function () {
  'use strict';
  var controllers = angular.module('app.controllers');

  controllers.controller('OtherProfileCtrl', function($scope, $stateParams,
    $firebaseObject, UsersFactory) {
    var userId = $stateParams.userId;
    console.log(userId);
    $scope.user = UsersFactory.get(userId);
  });
})();