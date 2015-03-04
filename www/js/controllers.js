var count = 0;

angular.module('app.controllers', [])

.controller('UserGroupsCtrl', function($scope, Users, $stateParams) {
  var user = Users.get('sadikmaxson');
  user.$bindTo($scope, 'user');

  $scope.activateGroup = function(groupName) {
    // console.log(user['groups'][groupName]['active']);
    user['groups'][groupName]['active'] = true;
    console.log(groupName + ' is active!!! :)');
    user.$save();
  };
})

.controller('ProfileCtrl', function($scope, $firebase, Users) {
  var user = Users.get('sadikmaxson');
  user.$bindTo($scope, 'user');
  // user.tempDescription = user.description;

  $scope.updateProfile = function(description) {
    user.description = description;
    user.$save();
  };
})

.controller('UserDetailCtrl', function($scope, $stateParams, $firebase, Users) {
  var userId = $stateParams.userId;
  var user = Users.get(userId);
  user.$bindTo($scope, 'user');

  // $scope.updateProfile = function(description) {
  //   user.description = description;
  //   user.$save();
  // };
})

.controller('GroupDetailCtrl', function($scope, $stateParams, Groups) {

  var groupId = $stateParams.groupName;

  var groupRef = Groups.getUserByType(groupId, 'activeUsers');
  console.log(groupRef);
  $scope.activeUsers = groupRef;
  $scope.groupName = groupId;
});

