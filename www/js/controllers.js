var count = 0;

angular.module('app.controllers', [])

.controller('UserGroupsCtrl', function($scope, Users, $stateParams) {
  var user = Users.get('jameslinjl');
  user.$bindTo($scope, 'user');
  console.log(user);
  var activateGroup = function(groupName) {
    user.groups.groupName.active = true;
    console.log(groupName + ' is active!!! :)');
  };
})

.controller('ProfileCtrl', function($scope, $firebase, Users) {
  var user = Users.get('jameslinjl');
  user.$bindTo($scope, 'user');
})

.controller('GroupDetailCtrl', function($scope, $stateParams, Groups) {

  var groupId = $stateParams.groupName;

  var groupRef = Groups.getUserByType(groupId, 'activeUsers');
  console.log(groupRef);
  $scope.activeUsers = groupRef;
  $scope.groupName = groupId;
});

