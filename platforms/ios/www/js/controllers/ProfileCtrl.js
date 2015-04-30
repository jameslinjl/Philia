(function () {
  'use strict';
  var controllers = angular.module('app.controllers');

  controllers.controller('ProfileCtrl', function($scope,
    AuthFactory, CurrentUser) {

    $scope.user = CurrentUser.user;
    $scope.updateProfile = function(description) {
      $scope.user.description = description;
      $scope.user.$save();
    };
  });
})();


