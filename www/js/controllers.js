var count = 0;

angular.module('app.controllers', [])



.controller('LoadingCtrl', function($scope, $ionicLoading, $ionicModal, Groups) {

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

  $scope.openModal = function(groupName) {
    $scope.toggleGroup = groupName;
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.changeStatus = function(checked) {
    console.log($scope.toggleGroup);
    var userId = 'sadikmaxson';
    if(checked) {
      Groups.addUserToGroup(userId, $scope.toggleGroup, 'activeUsers');
    } else {
      Groups.removeUserFromGroup(userId, $scope.toggleGroup, 'activeUsers');
    }
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('UserGroupsCtrl', function($scope, Users, $stateParams, Groups) {

  var userId  = 'sadikmaxson';
  var user = Users.get(userId);
  user.$bindTo($scope, 'user');

  $scope.activateGroup = function(groupName, activity) {
    // console.log(user['groups'][groupName]['active']);

    Users.updateActiveUser(userId, groupName, activity, true);
    Groups.addUserToGroup(userId, groupName, activity);

    // user['groups'][groupName]['active'] = true;
    // console.log(groupName + ' is active!!! :)');
    // user.$save();
  };

  $scope.deactivateGroup = function(groupName) {
    Users.updateActiveUser(userId, groupName, activity, false);
    Groups.removeUserFromGroup(userId, groupName, activity);

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

// .controller('SubGroupCtrl', function($scope, $stateParams, Groups) {
//   var groupId = $stateParams.groupName;
//   var groupRef = Groups.getGroupById(groupId);
//   console.log(groupRef.$keyAt(0));
//   $scope.groupName = groupId;
//   $scope.subgroups = groupRef;
// })

.controller('GroupDetailCtrl', function($scope, $stateParams, Groups) {

  var groupId = $stateParams.groupName;

  var groupRef = Groups.getUserByType(groupId, 'activeUsers');
  console.log(groupRef);
  $scope.activeUsers = groupRef;
  $scope.groupName = groupId;
});

