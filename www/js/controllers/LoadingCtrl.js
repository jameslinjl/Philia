(function () {
  'use strict';
  var controllers = angular.module('app.controllers');

  controllers.controller('LoadingCtrl', function($scope, $ionicLoading,
    $ionicModal, UsersFactory, GroupsFactory, AuthFactory) {

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
      var userId  = AuthFactory.getUid();
      UsersFactory.getActivityTypes(userId, groupName);
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
      var userId  = AuthFactory.getUid();
      return UsersFactory.getActivityTypes(userId, groupName);
      // In this function we should return the list of activities and their
      // values
    };


    $scope.changeStatus = function(activityType, activeValue) {
      console.log($scope.toggleGroup);
      var userId = Auth.getUid();
      UsersFactory.updateActiveUser(userId, $scope.toggleGroup, activityType, activeValue);
      GroupsFactory.updateActiveGroup(userId, $scope.toggleGroup, activityType, activeValue);
    };


    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
  });
})();