var count = 0;

angular.module('app.controllers', [])

.controller('UserGroupsCtrl', function($scope, Users, $stateParams) {
  var user = Users.get($stateParams.userID);
  user.$bindTo($scope, 'user');

  var activateGroup = function(groupName) {
    user.groups.groupName.active = true;
    console.log(groupName + ' is active!!! :)');
  };
})

.controller('ProfileCtrl', function($scope, $firebase, Users) {
  var user = Users.get($stateParams.userID);
  user.$bindTo($scope, 'user');
})

.controller('GroupDetailCtrl', function($scope, $stateParams, Groups) {
  var groupId = $stateParams.groupId;
  var groupRef = Groups.get(groupId);
  groupRef.$bindTo($scope, 'group');
});

