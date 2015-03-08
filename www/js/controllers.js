var count = 0;

angular.module('app.controllers', [])



.controller('LoadingCtrl', function($scope, $ionicLoading, $ionicModal, Users, Groups) {

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

  $scope.getActivityTypes = function(groupName) {
    console.log(groupName);
    var userId  = 'jameslinjl';
    Users.getActivityTypes(userId, groupName);
    // In this function we should return the list of activities and their
    // values
  };

  $scope.openModal = function(groupName) {
    $scope.toggleGroup = groupName;
    $scope.activityTypes = $scope.getActivityTypes(groupName);
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.getActivityTypes = function(groupName) {
    console.log(groupName);
    var userId  = 'jameslinjl';
    return Users.getActivityTypes(userId, groupName);
    // In this function we should return the list of activities and their
    // values
  };


  $scope.changeStatus = function(activityType, activeValue) {
    console.log($scope.toggleGroup);
    var userId = 'jameslinjl';
    Users.updateActiveUser(userId, $scope.toggleGroup, activityType, activeValue);
    Groups.updateActiveGroup(userId, $scope.toggleGroup, activityType, activeValue);
  };


  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('UserGroupsCtrl', function($scope, Users, $stateParams, Groups) {

  var userId  = 'jameslinjl';
  var user = Users.get(userId);
  user.$bindTo($scope, 'user');
})

.controller('ProfileCtrl', function($scope, $firebase, Users) {
  var user = Users.get('jameslinjl');
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

  var groupRef = Groups.getUserByType(groupId, 'active');
  console.log(groupRef);
  $scope.activeUsers = groupRef;
  $scope.groupName = groupId;
});

