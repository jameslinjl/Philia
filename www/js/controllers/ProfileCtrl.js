(function () {
  'use strict';
  var controllers = angular.module('app.controllers');

  controllers.controller('ProfileCtrl', function($scope, $firebaseObject,
    UsersFactory, AuthFactory) {
    var user = UsersFactory.get(AuthFactory.getUid());
    user.$bindTo($scope, 'user');
    // user.tempDescription = user.description;

    $scope.updateProfile = function(description) {
      user.description = description;
      user.$save();
    };
  });
})();


