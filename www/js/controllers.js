var count = 0;

angular.module('app.controllers', [])



.controller('LoadingCtrl', function($scope, $ionicLoading, $ionicModal) {

 $scope.contact = {
    name: 'Mittens Cat',
    info: 'Tap anywhere on the card to open the modal'
  };

  $ionicModal.fromTemplateUrl('contact-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('UserGroupsCtrl', function($scope, Users, $stateParams) {

  var userID  = 'sadikmaxson';
  var user = Users.get(userID);
  user.$bindTo($scope, 'user');

  $scope.activateGroup = function(groupName, activity) {
    // console.log(user['groups'][groupName]['active']);

    Users.updateActiveUser(userID, groupName, activity, true);
    Groups.addUserToGroup(userID, groupName, activity);

    // user['groups'][groupName]['active'] = true;
    // console.log(groupName + ' is active!!! :)');
    // user.$save();
  };

  $scope.deactivateGroup = function(groupName) {
    Users.updateActiveUser(userID, groupName, activity, false);
    Groups.removeUserFromGroup(userID, groupName, activity);

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

