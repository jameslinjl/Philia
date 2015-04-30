(function () {
  'use strict';
  var controllers = angular.module('app.controllers');

  controllers.controller('UserGroupsCtrl', function($scope, $ionicLoading,
    $ionicModal, UsersFactory, GroupsFactory, AuthFactory, CurrentUser,
    $ionicHistory, $state) {

    $ionicHistory.clearHistory();

    $scope.settings = function() {
      $state.go('home.profile');
    };


    $scope.user = CurrentUser;

    $ionicModal.fromTemplateUrl('choose-activity.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function(groupName) {
      $scope.toggleGroup = groupName;
      $scope.activityTypes = CurrentUser.user.groups[groupName];
      $scope.modal.show();
      console.log($scope.activityTypes);
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.changeStatus = function(activityType, activeValue, groupName) {
      CurrentUser.user.groups[groupName][activityType] = activeValue;
      CurrentUser.user.$save();
      // UsersFactory.updateActiveUser(CurrentUser.uid, $scope.toggleGroup, activityType, activeValue);
      GroupsFactory.updateActiveGroup(CurrentUser.uid, groupName, activityType, activeValue);
    };


    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
  });
})();