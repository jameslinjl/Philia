(function () {
  'use strict';
  var controllers = angular.module('app.controllers');

  controllers.controller('GroupDetailCtrl', function($scope, $stateParams,
    UsersFactory, GroupsFactory, AuthFactory) {

    var groupId = $stateParams.groupName;

    // Lev's suggestions
    // $scope.users = $firebaseArray(FIRE_URL + '/groups/' + groupId);
    // $scope.users = Groups.getUsers(groupId);

    // this is a promise, once it's fulfilled, then do the function
    GroupsFactory.getUsersByTypes(groupId, AuthFactory.getUid())
     .then(function(result) {
        var userArr = [];
        result.forEach(function(uid) {
          userArr.push(Users.get(uid));
        });
        console.log(userArr);
        $scope.activeUsers = userArr;
      });

    $scope.groupName = groupId;
  });

})();