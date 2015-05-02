(function () {
  'use strict';
  var controllers = angular.module('app.controllers');

  controllers.controller('ProfileCtrl', function($scope,
    AuthFactory, CurrentUser) {

    console.log('loaded');

    $scope.user = CurrentUser.user;

    console.log($scope.user.image);
    $scope.updateProfile = function(description) {
      $scope.user.description = description;
      $scope.user.$save();
    };
  });
})();


