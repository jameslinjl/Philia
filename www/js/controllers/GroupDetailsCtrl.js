(function () {
  'use strict';
  var controllers = angular.module('app.controllers');

  controllers.controller('GroupDetailCtrl', function($scope, $stateParams,
    GroupsFactory, AuthFactory, _, CurrentUser) {

    $scope.currentGroups = [];

    var groupId = $stateParams.groupName;

    _.each(CurrentUser.user.groups[groupId], function( val, key ) {
      if ( val ) {
        $scope.currentGroups.push(key);
      }
    });

    $scope.activeUsers = GroupsFactory.getMembersOfGroup(groupId);

  });

})();