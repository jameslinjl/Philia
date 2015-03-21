
angular.module('app.controllers', [])

.controller('LoadingCtrl', function($scope, $ionicLoading, $ionicModal, Users, Groups, Auth) {

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
    var userId  = Auth.getUid();
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
    var userId  = Auth.getUid();
    return Users.getActivityTypes(userId, groupName);
    // In this function we should return the list of activities and their
    // values
  };


  $scope.changeStatus = function(activityType, activeValue) {
    console.log($scope.toggleGroup);
    var userId = Auth.getUid();
    Users.updateActiveUser(userId, $scope.toggleGroup, activityType, activeValue);
    Groups.updateActiveGroup(userId, $scope.toggleGroup, activityType, activeValue);
  };


  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('UserGroupsCtrl', function($scope, Users, $stateParams, Groups, Auth) {

  $scope.authObj = Auth.getAuthObj();

   // var userObj = {};
   // console.log(Auth.login($scope.authObj));
   Auth.login($scope.authObj).then(function(result) {
     var userId = result.facebook.id;
     console.log(userId);
     var user = Users.get(userId);
     Auth.setUser(userId);
     user.$bindTo($scope, 'user');
   });
})

.controller('ProfileCtrl', function($scope, $firebaseObject, Users, Auth) {
  var user = Users.get(Auth.getUid());
  user.$bindTo($scope, 'user');
  // user.tempDescription = user.description;

  $scope.updateProfile = function(description) {
    user.description = description;
    user.$save();
  };
})

.controller('UserDetailCtrl', function($scope, $stateParams, $firebaseObject, Users) {
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

.controller('GroupDetailCtrl', function($scope, $stateParams, Users, Groups, Auth) {

  var groupId = $stateParams.groupName;

  // this is a promise, once it's fulfilled, then do the function
  Groups.getUsersByTypes(groupId, Auth.getUid()).then(function(result) {
    var userArr = [];
    result.forEach(function(uid) {
      userArr.push(Users.get(uid));
    });
    console.log(userArr);
    $scope.activeUsers = userArr;
  });

  $scope.groupName = groupId;
});

// .controller('AuthCtrl', function($scope, Auth) {

//   $scope.authObj = Auth.getAuthObj();

//   // var userObj = {};
//   Auth.login($scope.authObj).then(function(result) {
//     console.log(result);
//   });


// });

