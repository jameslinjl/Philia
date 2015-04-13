(function () {
  'use strict';
  var controllers = angular.module('app.controllers');

  controllers.controller('UserDetailCtrl', function($scope, $stateParams,
    $firebaseObject, UsersFactory) {
    var userId = $stateParams.userId;
    var user = UsersFactory.get(userId);
    user.$bindTo($scope, 'user');

    // $scope.updateProfile = function(description) {
    //   user.description = description;
    //   user.$save();
    // };
  });
})();